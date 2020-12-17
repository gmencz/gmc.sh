import { User, Url } from '@prisma/client'

export type SafeUser = Omit<User, 'password'>

export type UrlsQuery = {
  urls: Url[]
  cursor: string | null
  take: number
  total: number
}

export type ErrorData = {
  message: string
  info: Record<string, unknown>
}

export type JoinMailingListData = {
  subscriberEmail: string
}
