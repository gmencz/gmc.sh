import { V1ApiTypes as ApiTypes, V1ApiTypes } from '@gmcsh/shared'
import { Static } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { db } from 'utils/db'

const queryUrl: RouteHandler<{
  Params: Static<typeof V1ApiTypes['queryUrlParams']>
  Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlResponse
}> = async (request, reply) => {
  const url = await db.url.findUnique({
    where: {
      id: request.params.urlId,
    },
    select: {
      id: true,
      url: true,
      target: true,
      createdAt: true,
      timesVisited: true,
      userId: true,
    },
  })

  if (!url) {
    return reply.status(404).send({
      message: `No URL with an id of ${request.params.urlId}.`,
      info: {},
    })
  }

  return reply.send({
    url,
  })
}

export { queryUrl }
