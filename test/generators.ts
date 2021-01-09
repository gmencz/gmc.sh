import { Users } from 'generated/graphql'
import faker from 'faker'

function generateUser(overrides: Partial<Users> = {}): Users {
  return {
    __typename: 'users',
    id: faker.random.uuid(),
    name: faker.name.findName(),
    last_seen: faker.date.recent().toISOString(),
    ...overrides,
  }
}

export { generateUser }
