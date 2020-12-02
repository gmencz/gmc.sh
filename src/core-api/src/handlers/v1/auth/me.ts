import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { RouteHandler } from 'fastify'
import admin from 'firebase-admin'
import { db } from 'utils/db'

const me: RouteHandler<{
  Reply: ApiTypes.ErrorResponse | ApiTypes.MeResponse
}> = async (request, reply) => {
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

  const user = await db.user.findUnique({
    where: {
      id: decodedToken.uid,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  })

  if (!user) {
    reply.status(404).send({
      message: 'User not found.',
      info: {},
    })
    return
  }

  reply.send({
    ...user,
  })
}

export { me }
