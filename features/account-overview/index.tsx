import { MeQuery, useMeQuery } from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { useToasts } from 'react-toast-notifications'

function AccountOverview() {
  const { addToast } = useToasts()
  const { data: me, status } = useMeQuery<MeQuery, ClientError>(
    {},
    {
      onError: error => {
        addToast(
          <h3 className="text-sm font-medium text-red-800">{error.message}</h3>,
          { appearance: 'error' },
        )
      },
      staleTime: Infinity,
    },
  )

  return (
    <>
      <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Schedules
                  </dt>
                  <dd>
                    {status === 'loading' && (
                      <div className="animate-pulse mt-4">
                        <div className="hidden sm:block bg-gray-200 h-5 w-full rounded-full">
                          <span className="sr-only">loading...</span>
                        </div>
                      </div>
                    )}
                    {status === 'success' && (
                      <div className="text-lg font-medium text-gray-900">
                        {me?.me.account?.schedules_aggregate.aggregate?.count}
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="text-lg font-medium text-gray-900">0</div>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <a
                // href="/"
                className="font-medium cursor-not-allowed text-indigo-700 hover:text-indigo-900"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountOverview
