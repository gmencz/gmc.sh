import { FastifyPluginCallback } from 'fastify'
import { authRoutes } from './auth'
import { healthCheckRoutes } from './health-check'
import { mailingRoutes } from './mailing'
import { urlRoutes } from './urls'
import { meRoutes } from './me'

const v1Routes: FastifyPluginCallback = (instance, _, next) => {
  instance.register(healthCheckRoutes)
  instance.register(authRoutes, { prefix: '/auth' })
  instance.register(urlRoutes, { prefix: '/urls' })
  instance.register(mailingRoutes, { prefix: '/mailing' })
  instance.register(meRoutes, { prefix: '/me' })

  next()
}

export { v1Routes }
