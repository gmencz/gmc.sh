import { rest } from 'msw'
import faker from 'faker'
import { APP_ENDPOINT } from 'utils/constants'

const fakeUser = {
  id: faker.random.uuid(),
  bio: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  email: faker.internet.email(),
  location: faker.address.city(),
  name: faker.name.findName(),
  profilePicture:
    'https://cdn.gmc.sh/profile-pictures/default_profile_picture.png',
  publicEmail: faker.internet.email(),
  twitterUsername: faker.internet.userName(),
  username: faker.internet.userName(),
  website: faker.internet.url(),
}

export const handlers = [
  rest.post(APP_ENDPOINT + `/api/auth/sign-in`, (_req, res, ctx) => {
    const data = {
      user: { ...fakeUser },
    }

    return res(
      ctx.status(200),
      ctx.cookie('__session', faker.random.uuid()),
      ctx.json(data),
    )
  }),
  rest.get(APP_ENDPOINT + `/api/me`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fakeUser))
  }),
  rest.post(
    APP_ENDPOINT + `/api/me/update-profile-picture`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ ...fakeUser, profilePicture: '/test_image.jpg' }),
      )
    },
  ),
  rest.get(APP_ENDPOINT + `/api/urls`, (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        urls: [],
        cursor: null,
        take: 10,
        total: 0,
      }),
    )
  }),
]
