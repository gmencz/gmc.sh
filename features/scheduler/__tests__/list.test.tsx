import {
  MySchedulesQuery,
  MySchedulesQueryVariables,
  Schedule,
  Schedule_Day_Week_Day_Enum,
} from 'generated/graphql'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from 'test/next-testing-utils'
import faker from 'faker'
import { server, graphql } from 'test/server/test-server'
import SchedulerList from '../list'

test("displays the users' schedules", async () => {
  const days: Schedule_Day_Week_Day_Enum[] = [
    Schedule_Day_Week_Day_Enum.Monday,
    Schedule_Day_Week_Day_Enum.Tuesday,
    Schedule_Day_Week_Day_Enum.Wednesday,
    Schedule_Day_Week_Day_Enum.Thursday,
    Schedule_Day_Week_Day_Enum.Friday,
    Schedule_Day_Week_Day_Enum.Saturday,
    Schedule_Day_Week_Day_Enum.Sunday,
  ]

  const schedules: Schedule[] = new Array(10).fill(null).map(() => {
    const scheduleId = faker.random.uuid()
    return {
      id: scheduleId,
      title: faker.random.words(),
      days: new Array(5).fill(null).map((_, index) => ({
        id: faker.random.uuid(),
        active: faker.random.boolean(),
        created_at: faker.date.recent().toISOString(),
        updated_at: faker.date.recent().toISOString(),
        week_day: days[index],
        schedule_id: scheduleId,
        tasks: [],
        tasks_aggregate: {
          nodes: [],
        },
      })),
      active: faker.random.boolean(),
      created_at: faker.date.recent().toISOString(),
      days_aggregate: {
        nodes: [],
      },
      updated_at: faker.date.recent().toISOString(),
      user_id: faker.random.uuid(),
    }
  })

  server.use(
    graphql.query<MySchedulesQuery, MySchedulesQueryVariables>(
      'MySchedules',
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.data<MySchedulesQuery>({
            me: {
              account: {
                schedules,
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
  )

  render(<SchedulerList />)

  await waitForElementToBeRemoved(
    () => screen.getAllByText(/loading schedules/i)[0],
  )

  schedules.forEach(schedule => {
    expect(screen.queryAllByText(schedule.title)).not.toHaveLength(0)
  })
})
