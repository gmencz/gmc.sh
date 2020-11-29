import { Static, Type } from '@sinclair/typebox'
import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { RouteHandler } from 'fastify'
import { db } from 'utils/db'

const queryUrlsQuerystring = Type.Object({
  cursor: Type.Optional(Type.String()),
  take: Type.Integer({ default: 10 }),
})

const queryUrls: RouteHandler<{
  Querystring: Static<typeof queryUrlsQuerystring>
  Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlsResponse
}> = async (request, reply) => {
  const urls = await db.url.findMany({
    where: {
      userId: request.user?.uid,
    },
    take: request.query.take,
    ...(request.query.cursor && {
      cursor: {
        id: request.query.cursor,
      },
    }),
    select: {
      id: true,
      url: true,
      target: true,
      createdAt: true,
      timesVisited: true,
    },
  })

  reply.send({
    urls,
    cursor: request.query.cursor || null,
    take: request.query.take,
  })
}

export { queryUrls, queryUrlsQuerystring }
export * from './url'
