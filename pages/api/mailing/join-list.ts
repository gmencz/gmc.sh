import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.body

  let decodedToken: { listId: number; subscriberEmail: string }
  try {
    decodedToken = await new Promise<{
      listId: number
      subscriberEmail: string
    }>((res, rej) => {
      jwt.verify(
        token,
        process.env.VERIFICATIONS_JWT_SECRET as string,
        (error, decoded) => {
          if (error) rej(error)
          res(decoded)
        },
      )
    })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).send({
        message: 'Invalid link.',
        info: {},
      })
    }

    if (error instanceof jwt.NotBeforeError) {
      return res.status(400).send({
        message: 'Invalid link.',
        info: {},
      })
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).send({
        message: 'Link expired, request to sign up again.',
        info: {},
      })
    }

    return res.status(500).send({
      message: 'Internal Server Error',
      info: {},
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { listId, subscriberEmail } = decodedToken

  // Create contact and add it to mailing list

  return res.json({
    subscriberEmail,
  })
}
