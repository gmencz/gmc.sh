import { MeQuery, MeQueryVariables } from 'generated/graphql'
import { server } from 'test/server/test-server'
import { graphql } from 'msw'
import faker from 'faker'
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from 'test/next-testing-utils'
import AccountOverview from '..'

test('displays the amount of schedules the user has', async () => {
  const schedulesCount = faker.random.number()
  server.use(
    graphql.query<MeQuery, MeQueryVariables>('Me', (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.data<MeQuery>({
          me: {
            user_id: faker.random.uuid(),
            account: {
              last_seen: faker.date.recent().toISOString(),
              name: faker.name.findName(),
              picture: faker.image.imageUrl(),
              verified: faker.random.boolean(),
              company: faker.company.companyName(),
              schedules_aggregate: {
                aggregate: {
                  count: schedulesCount,
                },
              },
            },
          },
        }),
      )
    }),
  )

  render(<AccountOverview />)

  const { queryByText: queryByTextInSchedules } = within(
    screen.getByText(/^schedules/i).nextElementSibling as HTMLElement,
  )

  await waitForElementToBeRemoved(() => screen.getByText(/loading schedules/i))
  expect(queryByTextInSchedules(schedulesCount)).toBeInTheDocument()
})
