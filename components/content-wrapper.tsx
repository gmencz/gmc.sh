import { getHours } from 'date-fns'
import { MeQuery, useMeQuery } from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { ReactNode } from 'react'

type ContentWrapperProps = {
  children: ReactNode
}

function ContentWrapper({ children }: ContentWrapperProps) {
  const { data: me, status } = useMeQuery<MeQuery, ClientError>({})
  const profilePicture = me?.me.account?.picture || '/default_picture.png'
  const greetUser = () => {
    const hour = getHours(new Date())
    if (hour >= 5 && hour <= 12) {
      return 'Good morning'
    } else if (hour >= 12 && hour <= 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  return (
    <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                {status === 'loading' && (
                  <div className="animate-pulse">
                    <div className="hidden rounded-full sm:block bg-gray-200 h-16 w-16">
                      <span className="sr-only">loading...</span>
                    </div>
                  </div>
                )}
                {status === 'success' && (
                  <img
                    className="hidden h-16 w-16 rounded-full sm:block"
                    src={profilePicture}
                    alt={me?.me.account?.name}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center">
                    {status === 'loading' && (
                      <div className="animate-pulse">
                        <div className="rounded-full sm:hidden bg-gray-200 h-16 w-16">
                          <span className="sr-only">loading...</span>
                        </div>
                      </div>
                    )}
                    {status === 'success' && (
                      <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src={profilePicture}
                        alt={me?.me.account?.name}
                      />
                    )}
                    <div className="ml-3 flex-1">
                      {status === 'loading' && (
                        <div className="animate-pulse mb-3">
                          <div className="h-4 bg-gray-200 rounded">
                            <span className="sr-only">loading...</span>
                          </div>
                        </div>
                      )}
                      {status === 'success' && (
                        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                          {greetUser()}, {me?.me.account?.name}
                        </h1>
                      )}
                      {status === 'error' && (
                        <strong>Couldn&apos;t load profile.</strong>
                      )}
                    </div>
                  </div>
                  {status === 'loading' && (
                    <div className="animate-pulse sm:ml-3 mt-4 sm:mt-1">
                      <div className="h-14 sm:h-4 bg-gray-200 rounded">
                        <span className="sr-only">loading...</span>
                      </div>
                    </div>
                  )}
                  {status === 'success' && (
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      {me?.me.account?.company && (
                        <>
                          <dt className="sr-only">Company</dt>
                          <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                            {/* Heroicon name: office-building */}
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {me.me.account.company}
                          </dd>
                        </>
                      )}
                      {me?.me.account?.verified && (
                        <dl>
                          <dt className="sr-only">Account status</dt>
                          <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                            {/* Heroicon name: check-circle */}
                            <svg
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Verified account
                          </dd>
                        </dl>
                      )}
                    </dl>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                type="button"
                disabled
                className="inline-flex disabled:cursor-not-allowed items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add credits
              </button>
              <button
                type="button"
                disabled
                className="inline-flex disabled:cursor-not-allowed items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </main>
  )
}

export default ContentWrapper
