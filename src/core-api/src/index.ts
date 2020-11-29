import { build } from './server'

build().then(server => {
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
})
