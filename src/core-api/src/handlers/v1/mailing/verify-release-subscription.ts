import { V1ApiTypes } from '@gmcsh/shared'
import { joinMailingListBody } from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { FRONTEND_ENDPOINT } from 'utils/constants'
import { handleValidationError } from 'utils/handle-validation-error'
import { transactionalEmailsClient } from 'utils/sendinblue-api'

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
  const confirmationLink = `${FRONTEND_ENDPOINT}/verify/release-subscription?listId=${listId}&subscriberEmail=${subscriberEmail}`

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
