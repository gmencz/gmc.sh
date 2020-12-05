import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { registerBody, signinBody } from '@gmcsh/shared/src/types/core-api/v1'
import { FastifyPluginCallback } from 'fastify'
import { me } from 'handlers/v1/auth/me'
import { register } from 'handlers/v1/auth/register'
import { signin } from 'handlers/v1/auth/sign-in'
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
