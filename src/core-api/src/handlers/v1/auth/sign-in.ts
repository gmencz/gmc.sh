import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { Static, Type } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { verify } from 'argon2'
import { db } from 'utils/db'
import { handleValidationError } from 'utils/handle-validation-error'

const signinBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

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

export { signin, signinBody }
