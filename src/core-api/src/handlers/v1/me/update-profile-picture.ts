import { V1ApiTypes } from '@gmcsh/shared'
import { differenceInMinutes } from 'date-fns'
import { RouteHandler } from 'fastify'
import { File } from 'fastify-multer/lib/interfaces'
import { extname } from 'path'
import { computerVisionClient } from 'utils/computer-vision-client'
import { db } from 'utils/db'
import { profilePicturesClient } from 'utils/profile-pictures-client'

const allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif']

const updateProfilePicture: RouteHandler<{
  Reply: V1ApiTypes.ErrorResponse | V1ApiTypes.MeResponse
}> = async (request, reply) => {
  const user: V1ApiTypes.MeResponse = request.session.get('data').user
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  })

  if (dbUser?.updatedProfilePictureAt) {
    const hasToWait =
      differenceInMinutes(new Date(), dbUser.updatedProfilePictureAt) < 3

    if (hasToWait) {
      return reply.status(409).send({
        message: `You can only update your profile picture once every 3 minutes.`,
        info: {},
      })
    }
  }

  // @ts-expect-error because file is not a known property of request.
  const file: File = request.file
  const fileExtension = extname(file.originalname)

  if (!file.buffer) {
    return reply.status(500).send({
      message: 'Something went wrong processing your image.',
      info: {},
    })
  }

  if (!allowedFileExtensions.includes(fileExtension)) {
    return reply.status(415).send({
      message:
        'Unsupported image type, supported types are JPG, JPEG, PNG, GIF and JFIF.',
      info: {},
    })
  }

  const { adult } = await computerVisionClient.analyzeImageInStream(
    file.buffer,
    { visualFeatures: ['Adult'] },
  )

  if (adult?.isAdultContent || adult?.isGoryContent || adult?.isRacyContent) {
    return reply.status(422).send({
      message: `Inappropiate image. Your profile picture can't contain adult content, gory content or racy content.`,
      info: {},
    })
  }

  const fileSizeInMB = (file.size as number) / 1000000
  if (fileSizeInMB >= 1) {
    return reply.status(413).send({
      message: 'Image is too large, maximum supported size is 1MB.',
      info: {},
    })
  }

  const blobName = `${user.id}${fileExtension}`
  const blockBlobClient = profilePicturesClient.getBlockBlobClient(blobName)

  await blockBlobClient.upload(file.buffer, file.buffer.length)

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      profilePicture: `https://gmcsh.blob.core.windows.net/profile-pictures/${blobName}`,
      updatedProfilePictureAt: new Date(),
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      name: true,
      bio: true,
      location: true,
      publicEmail: true,
      twitterUsername: true,
      website: true,
      profilePicture: true,
      updatedProfilePictureAt: true,
    },
  })

  const safeUser = {
    id: updatedUser.id,
    username: updatedUser.username,
    createdAt: updatedUser.createdAt,
    email: updatedUser.email,
    name: updatedUser.name,
    bio: updatedUser.bio,
    location: updatedUser.location,
    publicEmail: updatedUser.publicEmail,
    twitterUsername: updatedUser.twitterUsername,
    website: updatedUser.website,
    profilePicture: updatedUser.profilePicture,
  }

  const sessionData = request.session.get('data')
  request.session.set('data', {
    ...sessionData,
    user: {
      ...safeUser,
    },
  })

  return reply.send({
    ...safeUser,
  })
}

export { updateProfilePicture }
