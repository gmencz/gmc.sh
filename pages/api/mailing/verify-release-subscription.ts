import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import { contactsClient, transactionalEmailsClient } from 'utils/sendinblue-api'
import { APP_ENDPOINT } from 'utils/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { listId, subscriberEmail } = req.body

  try {
    const { body: contact } = await contactsClient.getContactInfo(
      subscriberEmail,
    )
    if (contact.listIds.includes(listId)) {
      return res.status(400).send({
        message: `You're already subscribed to the app release mailing list and will be notified when gmc.sh is out!`,
        info: {
          listId,
          subscriberEmail,
        },
      })
    }
  } catch (error) {
    if (error.response.statusCode !== 404) {
      return res.status(error.response.statusCode || 400).send({
        message: error.response.body.message,
        info: {
          ...error.response.body,
        },
      })
    }
  }

  const token = await new Promise((res, rej) => {
    jwt.sign(
      { listId, subscriberEmail },
      process.env.VERIFICATIONS_JWT_SECRET as string,
      { expiresIn: '24h' },
      (err, encoded) => {
        if (err) rej(err)
        res(encoded)
      },
    )
  })

  const confirmationLink = `${APP_ENDPOINT}/verify/release-subscription?token=${token}`

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await transactionalEmailsClient.sendTransacEmail({
      to: [{ email: subscriberEmail, name: 'Gmc.sh' }],
      sender: { email: 'info@gmc.sh', name: 'Gmc.sh' },
      subject: '[Gmc.sh]: Please verify your subscription email',
      htmlContent: `<html>
        <body>
          <p>Hi,</p>
          <p>To complete your sign up to get notified when gmc.sh is out, please verify your email:<p>
          <a href=${confirmationLink}>${confirmationLink}</a>
          <br>
          <p>The link expires in 24 hours.</p>
          <p>Thank you, Gmc.sh Team
        </body>
      </html>`,
    })
  } catch (error) {
    return res.status(error.response.statusCode || 400).send({
      message: error.response.body.message,
      info: {
        ...error.response.body,
      },
    })
  }

  return res.send({
    subscriberEmail,
  })
}
