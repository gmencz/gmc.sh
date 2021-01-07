import { getSdk } from 'generated/graphql'
import gqlClient from './gql-client'

function getGqlOperations(accessToken?: string) {
  if (accessToken) {
    gqlClient.setHeader('Authorization', `Bearer ${accessToken}`)
  }

  const { ...operations } = getSdk(gqlClient)
  return operations
}

export default getGqlOperations
