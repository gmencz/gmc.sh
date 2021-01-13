import {
  MeQuery,
  MeQueryVariables,
  MySchedulesQuery,
  MySchedulesQueryVariables,
  Schedule,
  Schedule_Day,
  Schedule_Day_Week_Day_Enum,
  UserQuery,
  UserQueryVariables,
} from 'generated/graphql'
import { graphql } from 'msw'
import faker from 'faker'

export const gqlHandlers = [
  graphql.query<MySchedulesQuery, MySchedulesQueryVariables>(
    'MySchedules',
    (req, res, ctx) => {
      const { limit, offset } = req.variables

      const days: Schedule_Day_Week_Day_Enum[] = [
        Schedule_Day_Week_Day_Enum.Monday,
        Schedule_Day_Week_Day_Enum.Tuesday,
        Schedule_Day_Week_Day_Enum.Wednesday,
        Schedule_Day_Week_Day_Enum.Thursday,
        Schedule_Day_Week_Day_Enum.Friday,
        Schedule_Day_Week_Day_Enum.Saturday,
        Schedule_Day_Week_Day_Enum.Sunday,
      ]
      const schedules: Schedule[] = new Array(30).fill(null).map(() => {
        const scheduleId = faker.random.uuid()
        return {
          id: scheduleId,
          title: faker.random.words(3),
          days: new Array(faker.random.number(7)).fill(null).map(() => {
            return {
              week_day: days[faker.random.number(days.length - 1)],
            } as Schedule_Day
          }),
          active: faker.random.boolean(),
          created_at: faker.date.recent().toISOString(),
          days_aggregate: {
            nodes: [],
          },
          updated_at: faker.date.recent().toISOString(),
          user_id: faker.random.uuid(),
        }
      })

      return res(
        ctx.status(200),
        ctx.data<MySchedulesQuery>({
          me: {
            account: {
              schedules: schedules.slice(offset, offset + limit),
              schedules_aggregate: {
                aggregate: {
                  count: schedules.length,
                },
              },
            },
          },
        }),
      )
    },
  ),

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
                count: 20,
              },
            },
          },
        },
      }),
    )
  }),

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

export const restHandlers = []
