import { V1ApiTypes } from '@gmcsh/shared'
import { ApiError } from '../api-error'
import { API_ENDPOINT } from '../constants'

export type SignInInputs = {
  username: string
  password: string
}

async function signIn({ username, password }: SignInInputs) {
  const response = await fetch(`${API_ENDPOINT}/v1/auth/sign-in`, {
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
    throw new ApiError(response.status, data as V1ApiTypes.ErrorResponse)
  }

  return data as V1ApiTypes.LoginResponse
}

export { signIn }
