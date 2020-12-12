import { V1ApiTypes } from '@gmcsh/shared'
import { ApiError } from 'utils/api-error'
import { betterFetch } from 'utils/better-fetch'
import { API_ENDPOINT } from 'utils/constants'

async function updateProfilePicture(formData: FormData) {
  const { data, error, statusCode } = await betterFetch<V1ApiTypes.MeResponse>(
    `${API_ENDPOINT}/v1/me/update-profile-picture`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    },
  )

  if (error) {
    throw new ApiError(statusCode, error)
  }

  return data
}

export { updateProfilePicture }
