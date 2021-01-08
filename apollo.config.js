// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' })

console.log(process.env.HASURA_ADMIN_SECRET)

module.exports = {
  client: {
    includes: ['./gql/**/*.graphql'],
    service: {
      endpoint: {
        url: process.env.GQL_ENDPOINT,
        headers: {
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
      },
    },
  },
}
