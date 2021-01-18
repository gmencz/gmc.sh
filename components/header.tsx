import { Menu, Transition } from '@headlessui/react'
import { useMeQuery } from 'generated/graphql'
import tw from 'twin.macro'

type HeaderProps = {
  openMobileSidebar: () => void
}

function Header({ openMobileSidebar }: HeaderProps) {
  const { data: me, status } = useMeQuery(
    {},
    {
      staleTime: Infinity,
    },
  )

  const profilePicture = me?.me.account?.picture || '/default_picture.png'

  return (
    <div tw="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
      <button
        onClick={openMobileSidebar}
        tw="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
      >
        <span tw="sr-only">Open sidebar</span>
        {/* Heroicon name: menu-alt-1 */}
        <svg
          tw="h-6 w-6"
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
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </button>
      {/* Search bar */}
      <div tw="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div tw="flex-1 flex">
          <form tw="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search_field" tw="sr-only">
              Search
            </label>
            <div tw="relative w-full text-gray-400 focus-within:text-gray-600">
              <div
                tw="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                aria-hidden="true"
              >
                {/* Heroicon name: search */}
                <svg
                  tw="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search_field"
                disabled
                name="search_field"
                tw="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </form>
        </div>
        <div tw="ml-4 flex items-center md:ml-6">
          <button tw="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span tw="sr-only">View notifications</span>
            {/* Heroicon name: bell */}
            <svg
              tw="h-6 w-6"
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Profile dropdown */}
          <div tw="ml-3 relative">
            <Menu>
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button tw="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                      {status === 'loading' && (
                        <div tw="animate-pulse">
                          <div tw="rounded-full bg-gray-200 h-8 w-8"></div>
                        </div>
                      )}
                      {status === 'success' && (
                        <img
                          tw="h-8 w-8 rounded-full"
                          src={profilePicture}
                          alt={me?.me.account?.name}
                        />
                      )}
                      {status === 'error' && (
                        <div tw="rounded-full h-8 w-8 text-red-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      )}
                      <span tw="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                        <span tw="sr-only">Open user menu for </span>
                        {status === 'loading' && (
                          <div tw="animate-pulse">
                            <div tw="rounded-full bg-gray-200 h-4 w-40"></div>
                          </div>
                        )}
                        {status === 'success' && (me?.me.account?.name || '')}
                      </span>
                      {/* Heroicon name: chevron-down */}
                      <svg
                        tw="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
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
                        tw="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 outline-none"
                      >
                        <Menu.Item disabled>
                          {({ active, disabled }) => (
                            <a
                              // href="/"
                              css={[
                                tw`block rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`,
                                active && tw`bg-gray-100 text-gray-900`,
                                disabled && tw`cursor-not-allowed`,
                              ]}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item disabled>
                          {({ active, disabled }) => (
                            <a
                              // href="/"
                              css={[
                                tw`block rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`,
                                active && tw`bg-gray-100 text-gray-900`,
                                disabled && tw`cursor-not-allowed`,
                              ]}
                              role="menuitem"
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active, disabled }) => (
                            <a
                              href="/api/logout"
                              css={[
                                tw`block rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`,
                                active && tw`bg-gray-100 text-gray-900`,
                                disabled && tw`cursor-not-allowed`,
                              ]}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </div>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
