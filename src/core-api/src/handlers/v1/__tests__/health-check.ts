import { createTestContext } from 'test/create-test-context'

const ctx = createTestContext()

describe('/v1/health-check', () => {
  test('sends a successful response', async () => {
    const response = await ctx.server.inject({
      method: 'GET',
      url: '/v1/health-check',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`"{\\"status\\":\\"OK\\"}"`)
  })
})
