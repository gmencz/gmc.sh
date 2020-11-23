import { FastifyReply, FastifyRequest } from 'fastify'
import firebase from 'firebase'

async function healthCheck(
  _: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  console.log(firebase.auth().currentUser)

  return reply.send({
    status: 'OK',
  })
}

export { healthCheck }
