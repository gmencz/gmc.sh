import { Menu, Transition } from '@headlessui/react'
import { getHours } from 'date-fns'
import { MeQuery, useMeQuery } from 'generated/graphql'
import { ClientError } from 'graphql-request'
import { useApi } from 'hooks/use-api'
import Link from 'next/link'
import { ReactNode } from 'react'

type ContentWrapperProps = {
  children: ReactNode
}

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

function ContentWrapper({ children }: ContentWrapperProps) {
  const { client, isReady } = useApi()
  const { data: me, status } = useMeQuery<MeQuery, ClientError>(
    client,
    {},
    {
      staleTime: Infinity,
      enabled: isReady,
    },
  )

  const profilePicture = me?.me.account?.picture || '/default_picture.png'

  return (
    <main className="flex-1 relative pb-10 z-0 overflow-y-auto">
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0 sm:mr-4">
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
            <div className="mt-6 flex space-x-3 md:mt-0 relative">
              <Menu>
                {({ open }) => (
                  <div>
                    <Menu.Button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Create
                      <svg
                        className="-mr-1 ml-1.5 mt-0.5 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Menu.Button>
                    <Transition
                      show={open}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-left left-0 sm:origin-top-right absolute sm:right-0 sm:-left-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 outline-none"
                      >
                        <Menu.Item>
                          {({ active }) => (
                            <Link href="/scheduler/create-schedule">
                              <a
                                className={
                                  active
                                    ? 'group rounded-md flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                    : 'group rounded-md flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                                }
                                role="menuitem"
                              >
                                <svg
                                  className={
                                    active
                                      ? 'mr-3 h-5 w-5 text-gray-500'
                                      : 'mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                  }
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
                                <div>
                                  <span>Schedule</span>
                                  <span className="block text-gray-500">
                                    Manage your time
                                  </span>
                                </div>
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </div>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </main>
  )
}

export default ContentWrapper
