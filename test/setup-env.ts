import '@testing-library/jest-dom'
import { server } from './server/test-server'
import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '..', '.env.test.local') })

jest.mock('hooks/use-api', () => {
  const { GraphQLClient } = jest.requireActual('graphql-request')
  const faker = jest.requireActual('faker')

  const fakeUser = {
    email: faker.internet.email(),
    name: faker.name.findName(),
    nickname: faker.internet.userName(),
    picture: faker.image.imageUrl(),
    sub: faker.random.uuid(),
    updated_at: faker.date.recent(),
  }

  return {
    useApi: jest.fn().mockImplementation(() => ({
      client: new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT as string),
      isReady: true,
      user: fakeUser,
    })),
  }
})

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
