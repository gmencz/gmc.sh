/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv')
config({ path: '.env.local' })
config({ path: '.env.hasura' })

module.exports = {
  client: {
    includes: ['./gql/**/*.graphql'],
    service: {
      name: 'gmc-sh',
      url: process.env.NEXT_PUBLIC_GQL_ENDPOINT,
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
}
