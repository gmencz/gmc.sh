import { UserQuery, UserQueryVariables } from 'generated/graphql'
import { graphql } from 'msw'
import faker from 'faker'

export const handlers = [
  graphql.query<UserQuery, UserQueryVariables>('User', (req, res, ctx) => {
    const { id } = req.variables

    return res(
      ctx.status(200),
      ctx.data<UserQuery>({
        account_by_pk: {
          id,
          last_seen: faker.date.recent().toISOString(),
          name: faker.name.findName(),
          picture: faker.image.imageUrl(),
          verified: faker.random.boolean(),
          company: faker.company.companyName(),
        },
      }),
    )
  }),
]
