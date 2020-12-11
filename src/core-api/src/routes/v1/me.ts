import { V1ApiTypes } from '@gmcsh/shared'
import { FastifyPluginCallback } from 'fastify'
import { me } from 'handlers/v1/me'
import { isAuthenticatedHook } from 'hooks/is-authenticated'

const meRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.get<{
    Reply: V1ApiTypes.ErrorResponse | V1ApiTypes.MeResponse
  }>('/', { preValidation: isAuthenticatedHook }, me)

  next()
}

export { meRoutes }
