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
  // and reset the profile picture
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

test('updates user profile picture', async () => {
  const imageFilename = 'test_image.jpg'
  const imageStream = file(imageFilename)

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
  const cdnBlobName = `${userId}${extname(imageFilename)}`

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
