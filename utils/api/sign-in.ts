import { APP_ENDPOINT } from 'utils/constants'
import { ApiError } from '../api-error'

export type SignInInputs = {
  username: string
  password: string
}

async function signIn({ username, password }: SignInInputs) {
  const response = await fetch(APP_ENDPOINT + '/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      username,
      password,
    }),
  })

  const data = await response.json()

  if (response.status >= 400 && response.status < 600) {
    throw new ApiError(response.status, data)
  }

  return data
}

export { signIn }
