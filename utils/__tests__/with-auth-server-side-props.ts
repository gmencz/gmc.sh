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
      "dehydratedState": Object {
        "mutations": Array [],
        "queries": Array [
          Object {
            "queryHash": "\\"/api/me\\"",
            "queryKey": "/api/me",
            "state": Object {
              "data": Object {
                "email": "test@example.com",
                "id": "1",
                "username": "test",
              },
              "dataUpdateCount": 1,
              "dataUpdatedAt": 1609036318452,
              "error": null,
              "errorUpdateCount": 0,
              "errorUpdatedAt": 0,
              "fetchFailureCount": 0,
              "fetchMeta": null,
              "isFetching": false,
              "isInvalidated": false,
              "isPaused": false,
              "status": "success",
            },
          },
        ],
      },
      "id": 10,
      "user": Object {
        "email": "test@example.com",
        "id": "1",
        "username": "test",
      },
    }
  `)
})
