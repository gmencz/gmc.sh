import { V1ApiTypes } from '@gmcsh/shared'
import { ApiError } from 'utils/api-error'
import { betterFetch } from 'utils/better-fetch'
import { API_ENDPOINT } from 'utils/constants'

async function getCurrentUserLinks(forwardedCookieHeader: string) {
  const {
    data,
    error,
    statusCode,
  } = await betterFetch<V1ApiTypes.QueryUrlsResponse>(
    `${API_ENDPOINT}/v1/urls`,
    {
      headers: {
        cookie: forwardedCookieHeader,
      },
      credentials: 'include',
    },
  )

  if (error) {
    throw new ApiError(statusCode, error)
  }

  return data
}

export { getCurrentUserLinks }
