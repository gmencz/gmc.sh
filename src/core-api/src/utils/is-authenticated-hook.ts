import { preValidationHookHandler } from 'fastify'
import admin from 'firebase-admin'

const isAuthenticatedHook: preValidationHookHandler = async (
  request,
  reply,
  done,
) => {
  const sessionCookie = request.cookies.__session || ''

  let decodedToken: admin.auth.DecodedIdToken
  try {
    decodedToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, true /* checkRevoked */)
  } catch (error) {
    reply.status(401).send({
      message: 'Invalid session.',
      info: {
        ...error,
      },
    })
    return
  }

  request.userId = decodedToken.uid
  done()
}

export { isAuthenticatedHook }
