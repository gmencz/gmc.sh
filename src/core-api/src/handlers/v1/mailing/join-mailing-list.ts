import { joinMailingListQuerystring } from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { handleValidationError } from 'utils/handle-validation-error'

const joinMailingList: RouteHandler<{
  Querystring: Static<typeof joinMailingListQuerystring>
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

  return reply.send({
    status: 'OK',
  })
}

export { joinMailingList }
