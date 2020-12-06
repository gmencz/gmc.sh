import { V1ApiTypes as ApiTypes } from '@gmcsh/shared'
import {
  queryUrlParams,
  queryUrlsQuerystring,
} from '@gmcsh/shared/src/types/core-api/v1'
import { Static } from '@sinclair/typebox'
import { FastifyPluginCallback } from 'fastify'
import { queryUrls, queryUrl } from 'handlers/v1/urls'
import { isAuthenticatedHook } from 'hooks/is-authenticated'

const urlRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.get<{
    Querystring: Static<typeof queryUrlsQuerystring>
    Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlsResponse
  }>(
    '/',
    {
      preValidation: isAuthenticatedHook,
      schema: { querystring: queryUrlsQuerystring },
    },
    queryUrls,
  )

  instance.get<{
    Params: Static<typeof queryUrlParams>
    Reply: ApiTypes.ErrorResponse | ApiTypes.QueryUrlResponse
  }>('/:urlId', { preValidation: isAuthenticatedHook }, queryUrl)

  next()
}

export { urlRoutes }
