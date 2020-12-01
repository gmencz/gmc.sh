import { FastifyPluginCallback } from 'fastify'
import { authRoutes } from './auth'
import { healthCheckRoutes } from './health-check'
import { urlRoutes } from './urls'

const v1Routes: FastifyPluginCallback = (instance, _, next) => {
  instance.register(healthCheckRoutes)
  instance.register(authRoutes, { prefix: '/auth' })
  instance.register(urlRoutes, { prefix: '/urls' })

  next()
}

export { v1Routes }
