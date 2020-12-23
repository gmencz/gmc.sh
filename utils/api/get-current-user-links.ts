import { UrlsQuery } from '@types'
import { ApiError } from 'utils/api-error'
import { betterFetch } from 'utils/better-fetch'
import { APP_ENDPOINT } from 'utils/constants'

async function getCurrentUserLinks() {
  const { data, error, statusCode } = await betterFetch(
    APP_ENDPOINT + '/api/urls',
    {
      credentials: 'include',
    },
  )

  if (error) {
    throw new ApiError(statusCode, error)
  }

  return data as UrlsQuery
}

export { getCurrentUserLinks }
