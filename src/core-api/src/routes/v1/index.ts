import { FastifyPluginCallback } from 'fastify'
import { healthCheckRoutes } from './health-check'

const v1Routes: FastifyPluginCallback = (instance, _, next) => {
  instance.register(healthCheckRoutes)

  next()
}

export { v1Routes }
