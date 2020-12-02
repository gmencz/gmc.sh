import { preValidationHookHandler } from 'fastify'
import admin from 'firebase-admin'
import firebase from 'firebase'
import addWeeks from 'date-fns/addWeeks'
import isAfter from 'date-fns/isAfter'

const isAuthenticatedHook: preValidationHookHandler = async (
  request,
  reply,
) => {
  const sessionCookie = request.cookies.__session || ''

  let decodedToken: admin.auth.DecodedIdToken
  try {
    decodedToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true /* checkRevoked */)
  } catch (error) {
    reply.clearCookie('__session')
    reply.status(401).send({
      message: 'Invalid session.',
      info: {
        ...error,
      },
    })
    return
  }

  // If the session is a week old (could be any time before expiry limit but I chose a week)
  // create a new session cookie so we have a session which never expires.
  const sessionCreatedAt = new Date(decodedToken.auth_time * 1000)
  const sessionRefreshDate = addWeeks(sessionCreatedAt, 1)
  const today = new Date()

  if (isAfter(today, sessionRefreshDate)) {
    let customToken = ''

    try {
      customToken = await admin.auth().createCustomToken(decodedToken.uid)
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
    }

    // Expires in 2 weeks (14 days)
    const expiresIn = 60 * 60 * 24 * 14 * 1000
    const refreshedSessionCookie = await admin
      .auth()
      .createSessionCookie(authToken, { expiresIn })

    reply.setCookie('__session', refreshedSessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
  }

  request.user = decodedToken
}

export { isAuthenticatedHook }
