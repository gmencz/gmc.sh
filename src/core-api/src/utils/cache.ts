import { Client } from 'memjs'

const cache = Client.create(
  `${process.env.MEMCACHED_HOST}:${process.env.MEMCACHED_PORT}`,
)

export { cache }
