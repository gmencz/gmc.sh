import fastify from 'fastify'
import admin from 'firebase-admin'

declare module 'fastify' {
  interface FastifyRequest {
    user: admin.auth.DecodedIdToken | null
  }
}
