import Head from 'next/head'
import { authenticatedServerSideProps } from 'utils/authenticated-server-side-props'
import { useState } from 'react'
import { MeQuery, useMeQuery } from 'generated/graphql'
import { getHours } from 'date-fns'
import Sidebar from 'components/sidebar'
import Header from 'components/header'
import { useToasts } from 'react-toast-notifications'
import { ClientError } from 'graphql-request'

export const getServerSideProps = authenticatedServerSideProps()

function Index() {
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
    },
  )

  const profilePicture = me?.me.account?.picture || '/default_picture.png'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const openMobileSidebar = () => setIsMobileSidebarOpen(true)
  const closeMobileSidebar = () => setIsMobileSidebarOpen(false)

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
    <>
      <Head>
        <title>Home / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Organize your life with just a few clicks using our powerful and modern tools."
        />

        <meta name="image" content="https://app.gmc.sh/generic_hero.png" />
        <meta
          name="keywords"
          content="Organize, tasks, schedules, url shortener, free"
        />

        <meta property="og:url" content="https://app.gmc.sh/" />
        <meta property="og:title" content="Home / Gmc.sh" />
        <meta
          property="og:description"
          content="Organize your life with just a few clicks using our powerful and modern tools."
        />
        <meta
          property="og:image"
          content="https://app.gmc.sh/generic_hero.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Home / Gmc.sh" />
        <meta
          name="twitter:description"
          content="Organize your life with just a few clicks using our powerful and modern tools."
        />
        <meta
          name="twitter:image"
          content="https://app.gmc.sh/generic_hero.png"
        />
      </Head>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onCloseMobileSidebar={closeMobileSidebar}
        />

        <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
          <Header openMobileSidebar={openMobileSidebar} />

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

            <div className="mt-8">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">
                  Overview
                </h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Card */}

                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {/* Heroicon name: scale */}
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
                              <div className="text-lg font-medium text-gray-900">
                                1
                              </div>
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

                  {/* More cards... */}
                </div>
              </div>

              <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Recent activity
              </h2>

              {/* Activity list (smallest breakopoint only) */}
              <div className="shadow sm:hidden">
                <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                  <li>
                    <a
                      href="/"
                      className="block px-4 py-4 bg-white hover:bg-gray-50"
                    >
                      <span className="flex items-center space-x-4">
                        <span className="flex-1 flex space-x-2 truncate">
                          {/* Heroicon name: cash */}
                          <svg
                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="flex flex-col text-gray-500 text-sm truncate">
                            <span className="truncate">Example schedule</span>
                            <span className="text-gray-900 font-medium">
                              Monday, Friday
                            </span>
                            <span>January 9, 2021</span>
                          </span>
                        </span>
                        {/* Heroicon name: chevron-right */}
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </a>
                  </li>

                  {/* More items... */}
                </ul>

                <nav
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between">
                    <a
                      href="/"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Previous
                    </a>
                    <a
                      href="/"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              </div>

              {/* Activity table (small breakopoint and up) */}
              <div className="hidden sm:block">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col mt-2">
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Schedule
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              On days
                            </th>
                            <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                              Status
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr className="bg-white">
                            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <a
                                  href="/"
                                  className="group inline-flex space-x-2 truncate text-sm"
                                >
                                  <svg
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    Example schedule
                                  </p>
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium"></span>
                              Monday, Friday
                            </td>
                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                                active
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              January 9, 2021
                            </td>
                          </tr>

                          {/* More rows... */}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <nav
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                        aria-label="Pagination"
                      >
                        <div className="hidden sm:block">
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to{' '}
                            <span className="font-medium">1</span> of{' '}
                            <span className="font-medium">1</span> result
                          </p>
                        </div>
                        <div className="flex-1 flex justify-between sm:justify-end">
                          <a
                            // href="/"
                            className="relative cursor-not-allowed inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Previous
                          </a>
                          <a
                            // href="/"
                            className="ml-3 cursor-not-allowed relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Next
                          </a>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Index
