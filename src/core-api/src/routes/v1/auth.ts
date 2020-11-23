import { FastifyPluginCallback } from 'fastify'
import { register, registerBody } from 'handlers/v1/auth/register'

const authRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.post(
    '/auth/register',
    { schema: { body: registerBody }, attachValidation: true },
    register,
  )

  next()
}

export { authRoutes }
