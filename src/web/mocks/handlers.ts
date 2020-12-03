import { rest } from 'msw'

export const handlers = [
  rest.post('/v1/auth/sign-in', (req, res, ctx) => {
    const mockedUser = {
      id: '1',
      username: 'test',
      email: 'test@example.com',
      createdAt: new Date().toISOString(),
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...mockedUser,
      }),
    )
  }),
]
