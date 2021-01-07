import { GraphQLClient } from 'graphql-request'

const gqlClient = new GraphQLClient('/api/gql', {
  headers: {
    'x-proxy-auth': 'true',
  },
})

const gqlProxyClient = new GraphQLClient(process.env.GQL_ENDPOINT as string)

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> =>
    gqlClient.request<TData, TVariables>(query, variables)
}

export { gqlProxyClient, fetcher }
