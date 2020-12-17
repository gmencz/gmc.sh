import { V1ApiTypes } from '@gmcsh/shared'
import { ApiError } from '../api-error'
import { betterFetch } from '../better-fetch'
import { API_ENDPOINT } from '../constants'

export type SubscribeToReleaseInputs = {
  listId: number
  subscriberEmail: string
}

async function subscribeToRelease({
  listId,
  subscriberEmail,
}: SubscribeToReleaseInputs) {
  const {
    data,
    error,
    statusCode,
  } = await betterFetch<V1ApiTypes.JoinMailingListResponse>(
    `${API_ENDPOINT}/v1/mailing/verify-release-subscription`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        listId,
        subscriberEmail,
      }),
    },
  )

  if (error) {
    throw new ApiError(statusCode, error)
  }

  return data
}

export { subscribeToRelease }
