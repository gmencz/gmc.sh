import { APP_ENDPOINT } from 'utils/constants'
import { ApiError } from '../api-error'

async function getLoggedInUser(cookies: string) {
  const response = await fetch(APP_ENDPOINT + '/api/me', {
    headers: {
      cookie: cookies,
    },
  })

  const data = await response.json()

  if (response.status >= 400 && response.status < 600) {
    throw new ApiError(response.status, data)
  }

  return data
}

export { getLoggedInUser }
