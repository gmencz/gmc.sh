import { IClaims } from '@auth0/nextjs-auth0/dist/session/session'
import { GetMostRecentUsersQuery, Order_By } from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useQuery } from 'react-query'
import auth0 from 'utils/auth0'
import getGqlOperations from 'utils/get-gql-operations'
import { format, formatDistanceToNow } from 'date-fns'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await auth0.getSession(req)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    },
  }
}

type Props = {
  user: IClaims
}

function Index({ user }: Props) {
  const { data, error, status } = useQuery<
    GetMostRecentUsersQuery,
    ClientError
  >('getMostRecentUsers', () => {
    const { getMostRecentUsers } = getGqlOperations()

    return getMostRecentUsers({
      limit: 10,
      orderBy: { last_seen: Order_By.Desc },
    })
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <Head>
        <title>Hello {user.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p className="mb-1 font-bold">
        Hi{' '}
        <span role="img" aria-label="man raising hand emoji">
          🙋‍♂️
        </span>
      </p>
      <p className="mb-2 font-bold">This is your profile:</p>
      <pre className="overflow-x-auto">
        {JSON.stringify(
          {
            nickname: user.nickname,
            name: user.name,
            picture: user.picture,
            updated_at: format(
              new Date(user.updated_at),
              "dd/MM/yyyy 'at' HH:mm",
            ),
          },
          null,
          2,
        )}
      </pre>
      <div className="mt-4">
        <p className="mb-2 font-bold">
          And here are the most recent 10 users of the app:
        </p>
        {status === 'loading' && <span>loading...</span>}
        {status === 'error' && (
          <strong>
            Error:{' '}
            {error?.response.errors
              ? error.response.errors[0].message
              : error?.message}
          </strong>
        )}
        {status === 'success' && (
          <div className="space-y-4">
            {data?.users.map(({ id, name, last_seen }) => (
              <pre key={id} className="overflow-x-auto">
                {JSON.stringify(
                  {
                    name,
                    last_seen: formatDistanceToNow(new Date(last_seen), {
                      addSuffix: true,
                    }),
                  },
                  null,
                  2,
                )}
              </pre>
            ))}
          </div>
        )}
      </div>
      <a
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        href="/api/logout"
      >
        Logout
      </a>
    </div>
  )
}

export default Index
