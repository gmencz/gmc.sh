import { FastifyPluginCallback } from 'fastify'
import admin from 'firebase-admin'
import { healthCheck } from 'handlers/v1/health-check'

const healthCheckRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.get('/health-check', healthCheck)
  instance.get('/test', async (request, reply) => {
    let token = ''
    if (!request.headers.authorization) {
      reply.status(401).send({
        message: 'Missing authentication token.',
        info: {},
      })
      return
    }

    if (!request.headers.authorization.startsWith('Bearer')) {
      reply.status(401).send({
        message:
          'Invalid authentication scheme, use the Bearer authentication scheme.',
        info: {},
      })
      return
    }

    token = request.headers.authorization.split(' ')[1]
    const checkRevoked = true

    let decodedToken: admin.auth.DecodedIdToken

    try {
      decodedToken = await admin.auth().verifyIdToken(token, checkRevoked)
    } catch (error) {
      reply.status(401).send({
        message: 'Invalid authentication token.',
        info: {
          ...error,
        },
      })
      return
    }

    console.log(decodedToken)

    reply.send({
      status: 'OK',
      token: {
        ...decodedToken,
      },
    })
  })

  next()
}

export { healthCheckRoutes }
