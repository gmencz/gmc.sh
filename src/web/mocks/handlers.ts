import { V1ApiTypes } from '@gmcsh/shared'
import { rest } from 'msw'
import { API_ENDPOINT } from '../utils/constants'

type LoginBody = {
  username: string
  password: string
}

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
  rest.post(`${API_ENDPOINT}/v1/auth/sign-in`, (req, res, ctx) => {
    const { username, password } = req.body as LoginBody

    if (username !== 'validuser' && password !== 'validpassword') {
      return res(
        ctx.status(401),
        ctx.json({
          info: {},
          message: 'Wrong username or password, please check your spelling.',
        }),
      )
    }

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
