import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { FastifyPluginCallback } from 'fastify'
import { register } from 'handlers/v1/auth/register'
import { signin } from 'handlers/v1/auth/sign-in'

const authRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.post(
    '/register',
    {
      schema: { body: ApiTypes['registerBody'] },
      attachValidation: true,
    },
    register,
  )

  instance.post(
    '/sign-in',
    {
      schema: { body: ApiTypes['signinBody'] },
      attachValidation: true,
    },
    signin,
  )

  next()
}

export { authRoutes }
