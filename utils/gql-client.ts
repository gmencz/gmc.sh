import { GraphQLClient } from 'graphql-request'

const gqlProxy = new GraphQLClient('/api/gql')
const gqlClient = new GraphQLClient(process.env.GQL_ENDPOINT as string)

export { gqlProxy, gqlClient }
