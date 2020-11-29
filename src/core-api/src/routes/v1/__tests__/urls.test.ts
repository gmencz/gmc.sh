import { FastifyInstance } from 'fastify'
import { build } from 'server'

let server: FastifyInstance

beforeAll(async () => {
  server = await build({ disableLogger: true })
})

test('sends a 401 to unauthenticated users', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/v1/urls',
  })

  expect(response.statusCode).toBe(401)
})
