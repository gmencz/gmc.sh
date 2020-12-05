import { Type } from '@sinclair/typebox'

type User = {
  id: string
  username: string
  email: string
  createdAt: Date
  password: string
}

type Url = {
  id: string
  url: string
  target: string
  createdAt: Date
  userId: string | null
  timesVisited: number
}

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

export type MeResponse = SafeUser

export interface QueryUrlsResponse {
  urls: Pick<Url, 'id' | 'createdAt' | 'target' | 'timesVisited' | 'url'>[]
  cursor: string | null
  take: number
}

export interface QueryUrlResponse {
  url: Url
}

export const queryUrlsQuerystring = Type.Object({
  cursor: Type.Optional(Type.String()),
  take: Type.Integer({ default: 10 }),
})

export const queryUrlParams = Type.Object({
  urlId: Type.String({ maxLength: 255 }),
})

export const signinBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

export const registerBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ minLength: 1, maxLength: 255, format: 'email' }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

export const joinMailingListBody = Type.Object({
  listId: Type.Number(),
  subscriberEmail: Type.String({
    minLength: 1,
    maxLength: 255,
    format: 'email',
  }),
})

export interface JoinMailingListResponse {
  subscriberEmail: string
}
