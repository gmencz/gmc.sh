import { Url } from '@prisma/client'
import { nanoid } from 'nanoid'
import { createTestContext } from 'test/create-test-context'
import { createUserTestingSession } from 'test/create-user-testing-session'
import { db } from 'utils/db'

const ctx = createTestContext()

beforeAll(async () => {
  await db.url.deleteMany({})
})

afterAll(async () => {
  await db.url.deleteMany({})
})

test(`GET /v1/urls/:id returns the url with the provided id`, async () => {
  const { sessionCookie } = await createUserTestingSession(ctx.server)

  const newUrl = await db.url.create({
    data: {
      id: nanoid(),
      target: 'https://github.com/gmencz',
      url: 'https://gmc.sh/me',
    },
  })

  const response = await ctx.server.inject({
    method: 'GET',
    url: `/v1/urls/${newUrl.id}`,
    cookies: {
      __session: sessionCookie,
    },
  })

  const body = JSON.parse(response.body)

  expect(body.url).toMatchObject<Url>({
    id: newUrl.id,
    createdAt: (newUrl.createdAt.toISOString() as unknown) as Date,
    target: newUrl.target,
    timesVisited: newUrl.timesVisited,
    url: newUrl.url,
    userId: newUrl.userId,
  })
})
