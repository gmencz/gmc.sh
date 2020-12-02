import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { RouteHandler } from 'fastify'
import admin from 'firebase-admin'
import { cache } from 'utils/cache'
import { db } from 'utils/db'

const me: RouteHandler<{
  Reply: ApiTypes.ErrorResponse | ApiTypes.MeResponse
}> = async (request, reply) => {
  const sessionCookie = request.cookies.__session || ''

  let decodedToken: admin.auth.DecodedIdToken
  try {
    decodedToken = await admin
      .auth()
      .verifySessionCookie(sessionCookie, false /* checkRevoked */)
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

  const cacheHit = await cache.get(`user_${decodedToken.uid}`)
  if (cacheHit.value) {
    reply.send({
      ...JSON.parse(cacheHit.value.toString()),
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

  const cachedUserExpiry = 60 * 60 * 24 * 14
  await cache.add(`user_${decodedToken.uid}`, JSON.stringify({ ...user }), {
    expires: cachedUserExpiry,
  })

  reply.send({
    ...user,
  })
}

export { me }
