import { createTestContext } from 'test/create-test-context'
import FormData from 'form-data'
import { createUserTestingSession } from 'test/create-user-testing-session'
import { file } from 'test/files-utils'
import { db } from 'utils/db'
import { computerVisionClient } from 'utils/computer-vision-client'
import { profilePicturesClient } from 'utils/profile-pictures-client'
import { extname } from 'path'

const ctx = createTestContext()
let sessionCookie: string
let userId: string

beforeAll(async () => {
  const userSession = await createUserTestingSession(ctx.server)
  sessionCookie = userSession.sessionCookie
  userId = userSession.user.id
})

beforeEach(async () => {
  // This is to ignore the profile picture updates limit
  // and reset the profile picture to its default value.
  await db.user.update({
    where: { id: userId },
    data: {
      profilePicture: {
        set: 'https://cdn.gmc.sh/profile-pictures/default_profile_picture.png',
      },
      updatedProfilePictureAt: null,
    },
  })
})

const uploadToAzureStorage = jest.fn().mockResolvedValue({})
profilePicturesClient.getBlockBlobClient = jest.fn().mockReturnValue({
  upload: uploadToAzureStorage,
})

const testImageFilename = 'test_image.jpg'

test('updates user profile picture', async () => {
  const imageStream = file(testImageFilename)

  const chunks: Buffer[] = []
  let imageBuffer: Buffer | null = null

  imageStream.on('data', chunk => {
    chunks.push(chunk as Buffer)
  })

  imageStream.on('end', () => {
    imageBuffer = Buffer.concat(chunks)
  })

  const formData = new FormData()
  formData.append('newProfilePicture', imageStream)

  computerVisionClient.analyzeImageInStream = jest.fn().mockResolvedValueOnce({
    adult: {
      isAdultContent: false,
      isGoryContent: false,
      isRacyContent: false,
    },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/me/update-profile-picture',
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    },
    payload: formData,
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)
  const cdnBlobName = `${userId}${extname(testImageFilename)}`

  // Ensure that the right user was updated and the new profile picture
  // is set to image's url in our cdn.
  expect(body.id).toBe(userId)
  expect(body.profilePicture).toBe(
    `https://cdn.gmc.sh/profile-pictures/${cdnBlobName}`,
  )

  // Ensure that the azure content moderation service was used to analyze
  // our image for inappropiate content.
  expect(computerVisionClient.analyzeImageInStream).toHaveBeenCalled()
  expect(computerVisionClient.analyzeImageInStream).toHaveBeenCalledTimes(1)
  expect(
    computerVisionClient.analyzeImageInStream,
  ).toHaveBeenCalledWith(imageBuffer, { visualFeatures: ['Adult'] })

  // Ensure that the azure storage service was used to store the updated
  // users profile picture.
  expect(profilePicturesClient.getBlockBlobClient).toHaveBeenCalled()
  expect(profilePicturesClient.getBlockBlobClient).toHaveBeenCalledTimes(1)
  expect(profilePicturesClient.getBlockBlobClient).toHaveBeenCalledWith(
    cdnBlobName,
  )
  expect(uploadToAzureStorage).toHaveBeenCalled()
  expect(uploadToAzureStorage).toHaveBeenCalledTimes(1)
  expect(uploadToAzureStorage).toHaveBeenCalledWith(
    imageBuffer,
    ((imageBuffer as unknown) as Buffer).length,
  )
})

test('returns a 409 if user tries to update their profile picture without waiting 5 minutes', async () => {
  await db.user.update({
    where: { id: userId },
    data: {
      updatedProfilePictureAt: new Date(),
    },
  })

  const imageStream = file(testImageFilename)
  const formData = new FormData()
  formData.append('newProfilePicture', imageStream)

  computerVisionClient.analyzeImageInStream = jest.fn().mockResolvedValueOnce({
    adult: {
      isAdultContent: false,
      isGoryContent: false,
      isRacyContent: false,
    },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/me/update-profile-picture',
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    },
    payload: formData,
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)

  expect(response.statusCode).toBe(409)
  expect(body.message).toMatch(
    /you can only update your profile picture once every 5 minutes/i,
  )
})

test('returns a 415 if user sends an unsupported image type', async () => {
  const imageStream = file('svg_test_image.svg')
  const formData = new FormData()
  formData.append('newProfilePicture', imageStream)

  computerVisionClient.analyzeImageInStream = jest.fn().mockResolvedValueOnce({
    adult: {
      isAdultContent: false,
      isGoryContent: false,
      isRacyContent: false,
    },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/me/update-profile-picture',
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    },
    payload: formData,
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)
  expect(response.statusCode).toBe(415)
  expect(body.message).toMatch(
    /unsupported image type, supported types are jpg, jpeg, png, gif and jfif/i,
  )
})

test(`returns 422 if azure content moderation AI detects an inappropiate image`, async () => {
  const imageStream = file(testImageFilename)
  const formData = new FormData()
  formData.append('newProfilePicture', imageStream)

  computerVisionClient.analyzeImageInStream = jest.fn().mockResolvedValueOnce({
    adult: {
      isAdultContent: true,
      isGoryContent: false,
      isRacyContent: false,
    },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/me/update-profile-picture',
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    },
    payload: formData,
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)
  expect(response.statusCode).toBe(422)
  expect(body.message).toMatch(/inappropiate image/i)
})

test(`profile pictures can't be larger than 1MB`, async () => {
  const imageStream = file('large_test_image.jpg')
  const formData = new FormData()
  formData.append('newProfilePicture', imageStream)

  computerVisionClient.analyzeImageInStream = jest.fn().mockResolvedValueOnce({
    adult: {
      isAdultContent: false,
      isGoryContent: false,
      isRacyContent: false,
    },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/me/update-profile-picture',
    headers: {
      'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    },
    payload: formData,
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)
  expect(response.statusCode).toBe(413)
  expect(body.message).toMatch(
    /image is too large, maximum supported size is 1mb/i,
  )
})
