import { User } from '@gmcsh/core-api/node_modules/.prisma/client'

export interface ErrorResponse {
  message: string
  info: Record<string, unknown>
}

type SafeUser = Omit<User, 'password'>

export interface RegisterResponse {
  user: SafeUser
}

export interface LoginResponse {
  user: SafeUser
}
