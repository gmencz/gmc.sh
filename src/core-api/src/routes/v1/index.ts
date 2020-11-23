import { FastifyPluginCallback } from 'fastify'
import { authRoutes } from './auth'
import { healthCheckRoutes } from './health-check'

const v1Routes: FastifyPluginCallback = (instance, _, next) => {
  instance.register(healthCheckRoutes)
  instance.register(authRoutes)

  next()
}

export { v1Routes }
