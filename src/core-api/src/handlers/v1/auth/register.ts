import { Static, Type } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { nanoid as uniqueId } from 'nanoid'
import { hash } from 'argon2'
import { PrismaClientKnownRequestError, User } from '@prisma/client'
import admin from 'firebase-admin'
import firebase from 'firebase'
import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { handleValidationError } from 'utils/handle-validation-error'
import { db } from 'utils/db'

const registerBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ minLength: 1, maxLength: 255, format: 'email' }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

const register: RouteHandler<{
  Body: Static<typeof registerBody>
  Reply: ApiTypes.ErrorResponse | ApiTypes.RegisterResponse
}> = async (request, reply): Promise<void> => {
  // Validate request body
  if (request.validationError) {
    reply.log.error(request.validationError.validation)
    const errors = handleValidationError(request.validationError.validation)
    reply.status(422).send({
      message: 'Validation failed',
      info: {
        errors,
      },
    })
    return
  }

  const { email, username, password } = request.body
  const hashedPassword = await hash(password)
  let user: Omit<User, 'password'>

  try {
    user = await db.user.create({
      data: {
        id: `u-${uniqueId()}`,
        email,
        password: hashedPassword,
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      },
    })
  } catch (error) {
    reply.log.error(error)

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const { target } = error?.meta as { target: string[] }
        reply.status(409).send({
          message: `Taken ${target.join(', ')}.`,
          info: {
            ...error,
          },
        })
        return
      }
    }

    reply.status(500).send({
      message: 'Server error',
      info: {
        ...error,
      },
    })
    return
  }

  let customToken = ''

  try {
    customToken = await admin.auth().createCustomToken(user.id)
  } catch (e) {
    const error = e as admin.FirebaseError
    reply.status(500).send({
      message: error.message,
      info: {
        ...error,
      },
    })
    return
  }

  let firebaseCredential: firebase.auth.UserCredential

  try {
    firebaseCredential = await firebase
      .auth()
      .signInWithCustomToken(customToken)
  } catch (e) {
    const error = e as admin.FirebaseError
    reply.status(500).send({
      message: error.message,
      info: {
        ...error,
      },
    })
    return
  }

  let authToken = ''
  try {
    const idToken = await firebaseCredential.user?.getIdToken()
    if (!idToken) {
      reply.status(500).send({
        message: 'Server error',
        info: {},
      })
      return
    }

    authToken = idToken
  } catch (error) {
    reply.status(500).send({
      message: error.message,
      info: {
        ...error,
      },
    })
    return
  }

  let decodedIdToken: admin.auth.DecodedIdToken

  try {
    const checkRevoked = true
    decodedIdToken = await admin.auth().verifyIdToken(authToken, checkRevoked)
  } catch (error) {
    reply.status(401).send({
      message: 'Invalid authentication token.',
      info: {
        ...error,
      },
    })
    return
  }

  // A user that was not recently signed in is trying to set a session cookie.
  // To guard against ID token theft, require re-authentication.
  if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60)) {
    reply.status(401).send({
      message: 'Recent sign in required!',
      info: {},
    })
    return
  }

  // Expires in 2 weeks (14 days)
  const expiresIn = 60 * 60 * 24 * 14 * 1000
  const sessionCookie = await admin
    .auth()
    .createSessionCookie(authToken, { expiresIn })

  reply.setCookie('__session', sessionCookie, {
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  reply.send({
    user: {
      ...user,
    },
  })
}

export { register, registerBody }
