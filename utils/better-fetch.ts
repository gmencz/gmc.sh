import { ErrorData } from '@types'

type BetterFetchResponse<TData> =
  | SuccessfulFetchResponse<TData>
  | FailedFetchResponse

type SuccessfulFetchResponse<TData> = {
  data: TData
  error: null
  statusCode: number
}

type FailedFetchResponse = {
  data: null
  statusCode: number
  error: ErrorData
}

async function betterFetch<TData>(
  input: RequestInfo,
  init?: RequestInit | undefined,
): Promise<BetterFetchResponse<TData>> {
  const response = await fetch(input, init)
  const data = await response.json()

  if (response.status >= 400 && response.status < 600) {
    return {
      data: null,
      error: data,
      statusCode: response.status,
    }
  }

  return {
    error: null,
    data: data as TData,
    statusCode: response.status,
  }
}

export { betterFetch }