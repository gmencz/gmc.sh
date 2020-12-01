import { User } from '@prisma/client'
import { hash } from 'argon2'
import { FastifyInstance } from 'fastify'
import { db } from 'utils/db'

type TestUserSession = {
  user: Pick<User, 'username' | 'email' | 'id' | 'password'>
  sessionCookie: string
}

export async function createUserTestingSession(
  server: FastifyInstance,
): Promise<TestUserSession> {
  const testUsername = 'testuser'
  const testPassword = await hash('testpw123')
  const testEmail = 'test@test.com'
  const testId = '123'

  let user: User
  const existingTestUser = await db.user.findUnique({
    where: {
      id: testId,
    },
  })

  if (existingTestUser) {
    user = existingTestUser
  } else {
    user = await db.user.create({
      data: {
        id: testId,
        email: testEmail,
        username: testUsername,
        password: testPassword,
      },
    })
  }

  const signinResponse = await server.inject({
    method: 'POST',
    url: '/v1/auth/sign-in',
    payload: {
      username: user.username,
      password: 'testpw123',
    },
  })

  const sessionCookie = (signinResponse.cookies as {
    name: string
    value: string
  }[]).find(cookie => cookie.name === '__session')?.value

  if (!sessionCookie) {
    throw new Error('No session cookie found in create-user-testing-session.ts')
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      password: testPassword,
      username: user.username,
    },
    sessionCookie,
  }
}
