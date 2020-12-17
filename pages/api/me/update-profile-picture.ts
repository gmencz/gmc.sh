import { User } from '@prisma/client'
import { IncomingForm, Fields, Files } from 'formidable'
import { differenceInMinutes } from 'date-fns'
import { NextApiRequest, NextApiResponse } from 'next'
import { extname } from 'path'
import { promises as fs } from 'fs'
import { db } from 'utils/db'
import { withIronSession } from 'next-iron-session'
import { computerVisionClient } from 'utils/computer-vision-client'
import { profilePicturesClient } from 'utils/profile-pictures-client'

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const allowedFileExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.jfif']

  const user = req.session.get('user') as Pick<User, 'id'>
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  })

  if (dbUser?.updatedProfilePictureAt) {
    const hasToWait =
      differenceInMinutes(new Date(), dbUser.updatedProfilePictureAt) < 5

    if (hasToWait) {
      return res.status(409).send({
        message: `You can only update your profile picture once every 5 minutes.`,
        info: {},
      })
    }
  }

  const data: { fields: Fields; files: Files } = await new Promise(
    (resolve, reject) => {
      const form = new IncomingForm()

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err)
        resolve({ fields, files })
      })
    },
  )

  const file = data.files.newProfilePicture
  const fileExtension = extname(file.name)

  if (!allowedFileExtensions.includes(fileExtension)) {
    return res.status(415).send({
      message:
        'Unsupported image type, supported types are JPG, JPEG, PNG, GIF and JFIF.',
      info: {},
    })
  }

  const imageBuffer = await fs.readFile(data.files.newProfilePicture.path)

  const { adult } = await computerVisionClient.analyzeImageInStream(
    imageBuffer,
    { visualFeatures: ['Adult'] },
  )

  if (adult?.isAdultContent || adult?.isGoryContent || adult?.isRacyContent) {
    return res.status(422).send({
      message: `Inappropiate image. Your profile picture can't contain adult content, gory content or racy content.`,
      info: {},
    })
  }

  const fileSizeInMB = (file.size as number) / 1000000
  if (fileSizeInMB >= 1) {
    return res.status(413).send({
      message: 'Image is too large, maximum supported size is 1MB.',
      info: {},
    })
  }

  const blobName = `${user.id}${fileExtension}`
  const blockBlobClient = profilePicturesClient.getBlockBlobClient(blobName)

  await blockBlobClient.upload(imageBuffer, imageBuffer.length)

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      profilePicture: `https://cdn.gmc.sh/profile-pictures/${blobName}`,
      updatedProfilePictureAt: new Date(),
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...safeUser } = updatedUser

  req.session.set('user', {
    ...safeUser,
  })

  await req.session.save()

  return res.json({
    ...safeUser,
  })
}

export default withIronSession(handler, {
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
  cookieName: '__session',
})
