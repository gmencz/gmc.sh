import { ApiError } from 'utils/api-error'
import { betterFetch } from 'utils/better-fetch'
import { APP_ENDPOINT } from 'utils/constants'

export type CreateAccountInputs = {
  email: string
  username: string
  password: string
}

async function createAccount({
  email,
  username,
  password,
}: CreateAccountInputs) {
  const { data, error, statusCode } = await betterFetch(
    APP_ENDPOINT + '/api/auth/register',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    },
  )

  if (error) {
    throw new ApiError(statusCode, error)
  }

  return data
}

export { createAccount }
