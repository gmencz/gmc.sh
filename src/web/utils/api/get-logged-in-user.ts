import { V1ApiTypes } from '@gmcsh/shared'
import { ApiError } from '../api-error'
import { API_ENDPOINT } from '../constants'

async function getLoggedInUser(
  cookies: string,
): Promise<V1ApiTypes.MeResponse> {
  const response = await fetch(`${API_ENDPOINT}/v1/me`, {
    headers: {
      cookie: cookies,
    },
  })

  const data = await response.json()
  if (response.status >= 400 && response.status < 600) {
    throw new ApiError(response.status, data as V1ApiTypes.ErrorResponse)
  }

  return data as V1ApiTypes.MeResponse
}

export { getLoggedInUser }
