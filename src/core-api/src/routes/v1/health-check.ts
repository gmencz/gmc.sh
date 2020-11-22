import { FastifyPluginCallback } from 'fastify'
import { healthCheck } from 'handlers/v1/health-check'

const healthCheckRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.get('/health-check', healthCheck)

  next()
}

export { healthCheckRoutes }
