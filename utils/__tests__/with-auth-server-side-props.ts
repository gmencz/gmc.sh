import { withAuthServerSideProps } from 'utils/with-auth-server-side-props'
import createTestIronSession from 'test/create-test-iron-session'

test('appends props returned by custom getServerSideProps function to final getServerSideProps', async () => {
  const { session, req } = await createTestIronSession()

  session.set('user', {
    id: '1',
    email: 'test@example.com',
    username: 'test',
  })

  await session.save()

  const result = await withAuthServerSideProps(async () => {
    return {
      props: {
        id: 10,
      },
    }
  })({
    req,
  })

  expect(result.props).toMatchInlineSnapshot(`
    Object {
      "id": 10,
      "user": Object {
        "email": "test@example.com",
        "id": "1",
        "username": "test",
      },
    }
  `)
})
