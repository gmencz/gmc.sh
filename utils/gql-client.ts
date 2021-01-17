import { GraphQLClient } from 'graphql-request'

// For some reason in Jest tests whenever a request is made to /api/gql
// an error is thrown that only absolute URLs are supported so this here is how
// we fix it.
const gqlClient = new GraphQLClient(
  process.env.NODE_ENV === 'test'
    ? 'http://localhost:3000/api/gql'
    : '/api/gql',
)

const gqlProxyClient = new GraphQLClient(process.env.GQL_ENDPOINT as string)

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> =>
    gqlClient.request<TData, TVariables>(query, variables)
}

export { gqlProxyClient, fetcher }
