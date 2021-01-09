import {
  MostRecentUsersQuery,
  useMostRecentUsersQuery,
} from 'generated/graphql'
import Head from 'next/head'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { authenticatedServerSideProps } from 'utils/authenticated-server-side-props'
import { ClientError } from 'graphql-request'
import useMeQuery from 'hooks/use-me-query'

export const getServerSideProps = authenticatedServerSideProps()

function Index() {
  const { data: me } = useMeQuery()

  const {
    data: mostRecentUsers,
    error: errorFetchingMostRecentUsers,
    status: mostRecentUsersStatus,
  } = useMostRecentUsersQuery<MostRecentUsersQuery, ClientError>({
    limit: 10,
  })

  return (
    <div className="container mx-auto py-8 px-4">
      <Head>
        <title>Hello {me.name}</title>
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
            nickname: me.nickname,
            name: me.name,
            picture: me.picture,
          },
          null,
          2,
        )}
      </pre>
      <div className="mt-4">
        <p className="mb-2 font-bold">
          And here are the most recent users of the app:
        </p>
        {mostRecentUsersStatus === 'loading' && <span>loading...</span>}
        {mostRecentUsersStatus === 'error' && (
          <strong>
            Error:{' '}
            {errorFetchingMostRecentUsers?.response.errors
              ? errorFetchingMostRecentUsers.response.errors[0].message
              : errorFetchingMostRecentUsers?.message}
          </strong>
        )}
        {mostRecentUsersStatus === 'success' && (
          <div className="space-y-4">
            {mostRecentUsers?.users.map(({ id, name, last_seen }) => (
              <pre key={id} className="overflow-x-auto">
                {JSON.stringify(
                  {
                    name,
                    last_seen: formatDistanceToNow(parseISO(last_seen), {
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
