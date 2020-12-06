import { V1ApiTypes } from '@gmcsh/shared'
import {
  confirmJoinMailingListBody,
  joinMailingListBody,
} from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import jwt from 'jsonwebtoken'
import { handleValidationError } from 'utils/handle-validation-error'
import { contactsClient } from 'utils/sendinblue-api'

const joinMailingList: RouteHandler<{
  Body: Static<typeof confirmJoinMailingListBody>
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

  const { token } = request.body

  let decodedToken: Static<typeof joinMailingListBody>
  try {
    decodedToken = await new Promise((res, rej) => {
      jwt.verify(
        token,
        process.env.VERIFICATIONS_JWT_SECRET as string,
        (error, decoded) => {
          if (error) rej(error)
          res(decoded as Static<typeof joinMailingListBody>)
        },
      )
    })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return reply.status(400).send({
        message: 'Invalid link.',
        info: {},
      })
    }

    if (error instanceof jwt.NotBeforeError) {
      return reply.status(400).send({
        message: 'Invalid link.',
        info: {},
      })
    }

    if (error instanceof jwt.TokenExpiredError) {
      return reply.status(400).send({
        message: 'Link expired, request to sign up again.',
        info: {},
      })
    }

    return reply.status(500).send({
      message: 'Internal Server Error',
      info: {},
    })
  }

  const { listId, subscriberEmail } = decodedToken

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
