import { V1ApiTypes as ApiTypes, V1ApiTypes } from '@gmcsh/shared'
import { Static } from '@sinclair/typebox'
import { FastifyPluginCallback } from 'fastify'
import { queryUrls, queryUrl } from 'handlers/v1/urls'
import { isAuthenticatedHook } from 'hooks/is-authenticated'

const urlRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.get<{
    Querystring: Static<typeof V1ApiTypes['queryUrlsQuerystring']>
    Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlsResponse
  }>(
    '/',
    {
      preValidation: isAuthenticatedHook,
      schema: { querystring: V1ApiTypes['queryUrlsQuerystring'] },
    },
    queryUrls,
  )

  instance.get<{
    Params: Static<typeof V1ApiTypes['queryUrlParams']>
    Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlResponse
  }>('/:urlId', { preValidation: isAuthenticatedHook }, queryUrl)

  next()
}

export { urlRoutes }
