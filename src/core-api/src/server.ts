import { addWeeks, getUnixTime } from 'date-fns'
import { config as configureEnv } from 'dotenv'
configureEnv()

import fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import session from 'fastify-secure-session'
import { readFileSync } from 'fs'
import { join } from 'path'
import { v1Routes } from 'routes/v1'

type BuildOptions = {
  disableLogger?: boolean
}

function build(options: BuildOptions = {}): FastifyInstance {
  const server = fastify(
    options.disableLogger ? {} : { logger: { prettyPrint: true } },
  )

  // Decorators
  server.decorateRequest('user', null)

  // Plugins
  server.register(cors, {
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://app.gmc.sh',
    credentials: true,
  })

  const now = new Date()
  const inTwoWeeks = addWeeks(now, 2)
  server.register(session, {
    cookieName: '__session',
    key: readFileSync(join(__dirname, 'secret-key')),
    cookie: {
      expires: inTwoWeeks,
      maxAge: getUnixTime(inTwoWeeks),
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
