import { Account } from 'generated/graphql'
import faker from 'faker'

function generateUser(overrides: Partial<Account> = {}): Partial<Account> {
  return {
    __typename: 'account',
    id: faker.random.uuid(),
    name: faker.name.findName(),
    last_seen: faker.date.recent().toISOString(),
    verified: true,
    company: faker.company.companyName(),
    picture: faker.image.imageUrl(),
    schedules: [],
    ...overrides,
  }
}

export { generateUser }
