import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { RouteHandler } from 'fastify'

const me: RouteHandler<{
  Reply: ApiTypes.ErrorResponse | ApiTypes.MeResponse
}> = async (request, reply) => {
  const user: ApiTypes.MeResponse = request.session.get('data').user
  return reply.send({
    ...user,
  })
}

export { me }
