import { V1ApiTypes } from '@gmcsh/shared'
import { rest } from 'msw'
import { API_ENDPOINT } from '../utils/constants'

export const handlers = [
  rest.get(`${API_ENDPOINT}/v1/auth/me`, (_req, res, ctx) => {
    const mockedUser: V1ApiTypes.MeResponse = {
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
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...mockedUser,
      }),
    )
  }),
]
