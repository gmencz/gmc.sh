import {
  MostRecentUsersQuery,
  MostRecentUsersQueryVariables,
} from 'generated/graphql'
import { graphql } from 'msw'
import { generateUser } from 'test/generators'

export const gqlHandlers = [
  graphql.query<MostRecentUsersQuery, MostRecentUsersQueryVariables>(
    'MostRecentUsers',
    (req, res, ctx) => {
      const { limit } = req.variables
      const users = new Array(limit)
        .fill(null)
        .map(generateUser)
        .sort(
          (a, b) =>
            new Date(b.last_seen).valueOf() - new Date(a.last_seen).valueOf(),
        )

      return res(
        ctx.data<MostRecentUsersQuery>({
          users,
        }),
      )
    },
  ),
]

export const restHandlers = []
