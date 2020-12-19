import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { contactsClient } from 'utils/sendinblue-api'

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

  const { listId, subscriberEmail } = decodedToken

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await contactsClient.createContact({
      email: subscriberEmail,
    })
  } catch (error) {
    if (error.response.body.code !== 'duplicate_parameter') {
      return res.status(error.response.statusCode || 400).send({
        message: error.response.body.message,
        info: {
          ...error.response.body,
        },
      })
    }
  }

  try {
    await contactsClient.addContactToList(listId, {
      emails: [subscriberEmail],
    })
  } catch (error) {
    return res.status(error.response.statusCode || 400).send({
      message: error.response.body.message,
      info: {
        ...error.response.body,
      },
    })
  }

  return res.json({
    subscriberEmail,
  })
}
