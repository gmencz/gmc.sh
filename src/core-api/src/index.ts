import { build } from './server'

const server = build()

// We need the 0.0.0.0 so fastify listens on all interfaces
// if we don't set this then Traefik or any other reverse proxy
// would not be able to access this.
server.listen(Number(process.env.PORT), '0.0.0.0', (err, address) => {
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
