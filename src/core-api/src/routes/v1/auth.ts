import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { FastifyPluginCallback } from 'fastify'
import { me } from 'handlers/v1/auth/me'
import { register, registerBody } from 'handlers/v1/auth/register'
import { signin, signinBody } from 'handlers/v1/auth/sign-in'
import { isAuthenticatedHook } from 'hooks/is-authenticated'

const authRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.post(
    '/register',
    { schema: { body: registerBody }, attachValidation: true },
    register,
  )

  instance.post(
    '/sign-in',
    {
      schema: { body: signinBody },
      attachValidation: true,
    },
    signin,
  )

  instance.get<{
    Reply: ApiTypes.ErrorResponse | ApiTypes.MeResponse
  }>('/me', { preValidation: isAuthenticatedHook }, me)

  next()
}

export { authRoutes }
