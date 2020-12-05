import { V1ApiTypes } from '@gmcsh/shared'
import { joinMailingListBody } from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { handleValidationError } from 'utils/handle-validation-error'
import { contactsClient } from 'utils/sendinblue-api'

const joinMailingList: RouteHandler<{
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
    await contactsClient.createContact({
      email: subscriberEmail,
    })
  } catch (error) {
    if (error.response.body.code !== 'duplicate_parameter') {
      return reply.status(error.statusCode || 400).send({
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

export { joinMailingList }