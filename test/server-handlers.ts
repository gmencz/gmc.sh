import { rest } from 'msw'
import { APP_ENDPOINT } from '../utils/constants'

export const handlers = [
  rest.get(APP_ENDPOINT + '/api/me', (_req, res, ctx) => {
    const mockedUser = {
      id: '1',
      username: 'test',
      email: 'test@example.com',
      createdAt: new Date(),
      bio: null,
      location: null,
      name: null,
      publicEmail: null,
      twitterUsername: null,
      website: null,
      profilePicture:
        'https://cdn.gmc.sh/profile-pictures/default_profile_picture.png',
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...mockedUser,
      }),
    )
  }),
]
