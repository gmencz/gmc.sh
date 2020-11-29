import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { Static, Type } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { verify } from 'argon2'
import admin from 'firebase-admin'
import firebase from 'firebase'
import { db } from 'utils/db'
import { handleValidationError } from 'utils/handle-validation-error'

const signinBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

const signin: RouteHandler<{
  Body: Static<typeof signinBody>
  Reply: ApiTypes.LoginResponse | ApiTypes.ErrorResponse
}> = async (request, reply): Promise<void> => {
  if (request.validationError) {
    const errors = handleValidationError(request.validationError.validation)
    reply.log.error(request.validationError.validation)
    reply.status(422).send({
      message: 'Validation failed',
      info: {
        errors,
      },
    })
    return
  }

  const { username, password: plainPassword } = request.body
  const user = await db.user.findUnique({ where: { username } })
  if (!user) {
    reply.status(401).send({
      message: 'Wrong username or password, please check your spelling.',
      info: {},
    })
    return
  }

  const validPassword = await verify(user.password, plainPassword)
  if (!validPassword) {
    reply.status(401).send({
      message: 'Wrong username or password, please check your spelling.',
      info: {},
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
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })

  reply.send({
    user: {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      email: user.email,
    },
  })
}

export { signin, signinBody }
