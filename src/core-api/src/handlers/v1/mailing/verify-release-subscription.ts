import { V1ApiTypes } from '@gmcsh/shared'
import { joinMailingListBody } from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import jwt from 'jsonwebtoken'
import { FRONTEND_ENDPOINT } from 'utils/constants'
import { handleValidationError } from 'utils/handle-validation-error'
import { contactsClient, transactionalEmailsClient } from 'utils/sendinblue-api'

const verifyReleaseSubscription: RouteHandler<{
  Body: Static<typeof joinMailingListBody>
  Reply: V1ApiTypes.ErrorResponse | V1ApiTypes.JoinMailingListResponse
}> = async (request, reply) => {
  if (request.validationError) {
    const errors = handleValidationError(request.validationError.validation)
    reply.log.error(request.validationError.validation)
    reply.status(422).send({
      message: 'Validation failed',
      info: {
        errors,
      },
    })
    return
  }

  const { listId, subscriberEmail } = request.body

  try {
    const { body: contact } = await contactsClient.getContactInfo(
      subscriberEmail,
    )
    if (contact.listIds.includes(listId)) {
      return reply.status(400).send({
        message: `You're already subscribed to the app release mailing list and will be notified when gmc.sh is out!`,
        info: {
          listId,
          subscriberEmail,
        },
      })
    }
  } catch (error) {
    if (error.statusCode !== 404) {
      return reply.status(error.statusCode || 400).send({
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

  const confirmationLink = `${FRONTEND_ENDPOINT}/verify/release-subscription?token=${token}`

  try {
    await transactionalEmailsClient.sendTransacEmail({
      to: [{ email: subscriberEmail }],
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
    return reply.status(error.statusCode || 400).send({
      message: error.response.body.message,
      info: {
        ...error.response.body,
      },
    })
  }

  return reply.send({
    subscriberEmail,
  })
}

export { verifyReleaseSubscription }
