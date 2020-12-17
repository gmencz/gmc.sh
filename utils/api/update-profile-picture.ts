import { ApiError } from 'utils/api-error'
import { betterFetch } from 'utils/better-fetch'
import { APP_ENDPOINT } from 'utils/constants'

async function updateProfilePicture(formData: FormData) {
  const { data, error, statusCode } = await betterFetch(
    APP_ENDPOINT + '/api/me/update-profile-picture',
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
