import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { listId, subscriberEmail } = req.body

  // Check if user is subscribed already to the list

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // const confirmationLink = `${APP_ENDPOINT}/verify/release-subscription?token=${token}`

  // Send email with sendgrid maybe

  // await transactionalEmailsClient.sendTransacEmail({
  //   to: [{ email: subscriberEmail }],
  //   sender: { email: 'info@gmc.sh', name: 'Gmc.sh' },
  //   subject: '[Gmc.sh]: Please verify your subscription email',
  //   htmlContent: `<html>
  //     <body>
  //       <p>Hi,</p>
  //       <p>To complete your sign up to get notified when gmc.sh is out, please verify your email:<p>
  //       <a href=${confirmationLink}>${confirmationLink}</a>
  //       <br>
  //       <p>The link expires in 24 hours.</p>
  //       <p>Thank you, Gmc.sh Team
  //     </body>
  //   </html>`,
  // })

  return res.send({
    subscriberEmail,
  })
}
