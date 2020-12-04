import { GetServerSidePropsContext } from 'next'
import { server, rest } from '../../test/server'
import { API_ENDPOINT } from '../constants'
import { withAuthServerSideProps } from '../with-auth-server-side-props'

test('appends props returned by custom getServerSideProps function to final getServerSideProps', async () => {
  const mockedUser = {
    id: '1',
    username: 'test',
    email: 'test@example.com',
  }

  server.use(
    rest.get(`${API_ENDPOINT}/v1/auth/me`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          ...mockedUser,
        }),
      )
    }),
  )

  const result = await withAuthServerSideProps(async () => {
    return {
      props: {
        id: 10,
      },
    }
  })({ req: { headers: { cookie: '' } } } as GetServerSidePropsContext)

  expect(result.props.id).toBe(10)
  expect(result.props.user).toMatchObject(mockedUser)
})
