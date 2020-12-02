import { nanoid } from 'nanoid'
import { createTestContext } from 'test/create-test-context'
import { db } from 'utils/db'
import { createUserTestingSession } from 'test/create-user-testing-session'

const ctx = createTestContext()

beforeAll(async () => {
  await db.url.deleteMany({})
})

afterAll(async () => {
  await db.url.deleteMany({})
})

test(`GET /v1/urls returns the currently logged in user's urls`, async () => {
  const { sessionCookie, user } = await createUserTestingSession(ctx.server)

  const newUrl = await db.url.create({
    data: {
      id: nanoid(),
      target: `https://${nanoid()}`,
      url: `https://${nanoid()}`,
      User: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  const response = await ctx.server.inject({
    method: 'GET',
    url: '/v1/urls',
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)
  expect(body.urls).toHaveLength(1)
  expect(body.urls[0].id).toBe(newUrl.id)
  expect(body.cursor).toBeNull()
  expect(body.take).toBe(10)
})
