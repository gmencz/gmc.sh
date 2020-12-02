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
