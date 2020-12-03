import { V1ApiTypes } from '@gmcsh/shared'
import { rest } from 'msw'
import { API_ENDPOINT } from '../utils/constants'

export const handlers = [
  rest.get(`${API_ENDPOINT}/v1/auth/me`, (req, res, ctx) => {
    const mockedUser: V1ApiTypes.MeResponse = {
      id: '1',
      username: 'test',
      email: 'test@example.com',
      createdAt: new Date(),
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...mockedUser,
      }),
    )
  }),
]
