import { V1ApiTypes } from '@gmcsh/shared'
import fastify from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: V1ApiTypes.MeResponse
  }
}
