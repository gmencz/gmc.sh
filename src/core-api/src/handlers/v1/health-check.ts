import { FastifyReply, FastifyRequest } from 'fastify'

function healthCheck(_: FastifyRequest, reply: FastifyReply): void {
  reply.send({
    status: 'OK',
  })
}

export { healthCheck }
