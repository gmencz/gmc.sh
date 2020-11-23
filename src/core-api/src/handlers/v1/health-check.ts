import { FastifyReply, FastifyRequest } from 'fastify'

async function healthCheck(
  _: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  return reply.send({
    status: 'OK',
  })
}

export { healthCheck }
