import { V1ApiTypes } from '@gmcsh/shared'

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
  error: V1ApiTypes.ErrorResponse
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
      error: data as V1ApiTypes.ErrorResponse,
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
