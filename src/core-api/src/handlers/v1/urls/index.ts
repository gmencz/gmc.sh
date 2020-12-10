import { Static } from '@sinclair/typebox'
import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import { RouteHandler } from 'fastify'
import { db } from 'utils/db'

const queryUrls: RouteHandler<{
  Querystring: Static<typeof ApiTypes['queryUrlsQuerystring']>
  Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlsResponse
}> = async (request, reply) => {
  const totalUrls = await db.url.count()
  const urls = await db.url.findMany({
    where: {
      userId: request.session.get('data').user.id,
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
    total: totalUrls,
  })
}

export { queryUrls }
export * from './url'
