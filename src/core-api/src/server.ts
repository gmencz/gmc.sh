import { addWeeks } from 'date-fns'
import { join } from 'path'
import { config as configureEnv } from 'dotenv'

if (process.env.NODE_ENV === 'test') {
  configureEnv({ path: join(__dirname, '..', '.env.test') })
} else {
  configureEnv()
}

import fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import session from 'fastify-secure-session'
import { v1Routes } from 'routes/v1'

type BuildOptions = {
  disableLogger?: boolean
}

function build(options: BuildOptions = {}): FastifyInstance {
  const server = fastify(
    options.disableLogger ? {} : { logger: { prettyPrint: true } },
  )

  // Plugins
  server.register(cors, {
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://app.gmc.sh',
    credentials: true,
  })

  console.log(process.env.SESSION_SECRET)

  server.register(session, {
    cookieName: '__session',
    secret: process.env.SESSION_SECRET as string,
    salt: process.env.SESSION_SALT as string,
    cookie: {
      expires: addWeeks(new Date(), 2),
      maxAge: 60 * 60 * 24 * 14,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    },
  })

  // Routes
  server.register(v1Routes, { prefix: '/v1' })

  return server
}

export { build }
