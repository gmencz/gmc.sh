import { getSdk } from 'generated/graphql'
import { gqlProxy } from './gql-client'

type GqlProxyOpts = {
  publicOperation?: boolean
}

function getGqlOperations(
  proxyOpts: GqlProxyOpts = {},
  proxiedHeaders?: Record<string, string>,
) {
  if (proxiedHeaders) {
    gqlProxy.setHeaders(proxiedHeaders)
  }

  if (!proxyOpts.publicOperation) {
    gqlProxy.setHeader('x-proxy-auth', 'true')
  }

  const { ...operations } = getSdk(gqlProxy)
  return operations
}

export default getGqlOperations
