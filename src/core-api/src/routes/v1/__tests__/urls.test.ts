import { FastifyInstance } from 'fastify'
import { nanoid } from 'nanoid'
import { build } from 'server'
import { hash } from 'argon2'
import { db } from 'utils/db'

let server: FastifyInstance
const testUsername = 'testuser'
let testPassword: string

beforeAll(async () => {
  server = await build({ disableLogger: true })
  testPassword = await hash('testpw123')
  await db.user.create({
    data: {
      id: `u-${nanoid()}`,
      email: 'test@test.com',
      username: testUsername,
      password: testPassword,
    },
  })
})

afterAll(async () => {
  await db.user.delete({
    where: {
      username: testUsername,
    },
  })
  await server.close()
  await db.$disconnect()
})

test(`returns the currently logged in user's urls`, async () => {
  const signinResponse = await server.inject({
    method: 'POST',
    url: '/v1/auth/sign-in',
    payload: {
      username: testUsername,
      password: 'testpw123',
    },
  })

  const sessionCookie = (signinResponse.cookies as {
    name: string
    value: string
  }[]).find(cookie => cookie.name === '__session')?.value

  expect(sessionCookie).toBeTruthy()

  const newUrl = await db.url.create({
    data: {
      id: nanoid(),
      target: 'https://github.com/gmencz',
      url: 'https://gmc.sh/me',
      User: {
        connect: {
          username: testUsername,
        },
      },
    },
  })

  const response = await server.inject({
    method: 'GET',
    url: '/v1/urls',
    cookies: {
      __session: sessionCookie as string,
    },
  })

  const body = JSON.parse(response.body)
  expect(body.urls).toHaveLength(1)
  expect(body.urls[0].id).toBe(newUrl.id)
  expect(body.cursor).toBeNull()
  expect(body.take).toBe(10)
})
