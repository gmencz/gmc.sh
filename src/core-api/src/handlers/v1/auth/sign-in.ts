import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { signinBody } from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { verify } from 'argon2'
import { db } from 'utils/db'
import { handleValidationError } from 'utils/handle-validation-error'

const signin: RouteHandler<{
  Body: Static<typeof signinBody>
  Reply: ApiTypes.LoginResponse | ApiTypes.ErrorResponse
}> = async (request, reply): Promise<void> => {
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

  const { username, password: plainPassword } = request.body
  const user = await db.user.findUnique({ where: { username } })
  if (!user) {
    reply.status(401).send({
      message: 'Wrong username or password, please check your spelling.',
      info: {},
    })
    return
  }

  const validPassword = await verify(user.password, plainPassword)
  if (!validPassword) {
    reply.status(401).send({
      message: 'Wrong username or password, please check your spelling.',
      info: {},
    })
    return
  }

  const safeUser = {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
    email: user.email,
  }

  request.session.set('data', {
    user: {
      ...safeUser,
    },
    createdAt: new Date().toISOString(),
  })

  reply.send({
    user: {
      ...safeUser,
    },
  })
}

export { signin }
