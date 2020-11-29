import { FastifyInstance } from 'fastify'
import { build } from 'server'

let server: FastifyInstance

beforeAll(async () => {
  server = await build({ disableLogger: true })
})

test('health check endpoint sends a successful response', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/v1/health-check',
  })

  expect(response.statusCode).toBe(200)
  expect(response.body).toMatchInlineSnapshot(`"{\\"status\\":\\"OK\\"}"`)
})
