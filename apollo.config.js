// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env.local' })

module.exports = {
  client: {
    includes: ['./gql/**/*.graphql'],
    service: {
      name: 'gmc-sh',
      url: process.env.GQL_ENDPOINT,
    },
  },
}
