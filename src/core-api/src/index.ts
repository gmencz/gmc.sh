import fastify from 'fastify'
import { config as configureEnv } from 'dotenv'
import { v1Routes } from 'routes/v1'

configureEnv()
const server = fastify({ logger: true })

server.register(v1Routes, { prefix: '/v1' })

server.listen(Number(process.env.PORT), (err, address) => {
  if (err) {
    server.log.error(err.message)
    process.exit(1)
  }

  server.log.info(`Core API listening at ${address}`)
})

process.on('unhandledRejection', err => {
  server.log.error(`An unhandled promise rejection ocurred.`)
  throw err
})
