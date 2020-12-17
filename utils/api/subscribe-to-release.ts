import { APP_ENDPOINT } from 'utils/constants'
import { ApiError } from '../api-error'
import { betterFetch } from '../better-fetch'

export type SubscribeToReleaseInputs = {
  listId: number
  subscriberEmail: string
}

async function subscribeToRelease({
  listId,
  subscriberEmail,
}: SubscribeToReleaseInputs) {
  const { data, error, statusCode } = await betterFetch(
    APP_ENDPOINT + '/api/mailing/verify-release-subscription',
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
