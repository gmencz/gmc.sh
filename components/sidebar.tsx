import { Transition } from '@headlessui/react'
import { PER_PAGE } from 'features/scheduler/list'
import Image from 'next/image'
import ActiveLink from './active-link'

type SidebarProps = {
  isMobileSidebarOpen: boolean
  onCloseMobileSidebar: () => void
}

function Sidebar({ isMobileSidebarOpen, onCloseMobileSidebar }: SidebarProps) {
  return (
    <>
      <div className="lg:hidden">
        <Transition
          show={isMobileSidebarOpen}
          className="fixed inset-0 flex z-40"
        >
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0">
              <div
                className="absolute inset-0 bg-gray-600 opacity-75"
                aria-hidden="true"
              ></div>
            </div>
          </Transition.Child>

          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Transition.Child
                onClick={onCloseMobileSidebar}
                as="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Close sidebar</span>
                {/* Heroicon name: x */}
                <svg
                  className="h-6 w-6 text-white"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Transition.Child>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <Image
                className="h-8 w-auto"
                src="/logo_full.svg"
                alt="Gmc.sh logo"
                width={130}
                height={40}
                objectFit="cover"
              />
            </div>
            <nav
              className="mt-5 flex-shrink-0 h-full divide-y divide-indigo-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                <ActiveLink
                  activeClassName="bg-indigo-800 text-white hover"
                  href="/"
                >
                  <a
                    className="text-indigo-100 hover:text-white hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md"
                    aria-current="page"
                  >
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </a>
                </ActiveLink>

                <ActiveLink
                  activeClassName="bg-indigo-800 text-white hover"
                  href={{
                    pathname: '/scheduler',
                    query: { page: 1, 'per-page': PER_PAGE },
                  }}
                >
                  <a className="text-indigo-100 hover:text-white hover:bg-indigo-600 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                    {/* Heroicon name: clock */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                    Scheduler
                  </a>
                </ActiveLink>
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  <a
                    // href="/"
                    className="group cursor-not-allowed flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                  >
                    {/* Heroicon name: cog */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200 group-hover:text-indigo-200"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>

                  <a
                    // href="/"
                    className="group cursor-not-allowed flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                  >
                    {/* Heroicon name: question-mark-circle */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-300 group-hover:text-indigo-200"
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help
                  </a>

                  <a
                    // href="/"
                    className="group cursor-not-allowed flex items-center px-2 py-2 text-base font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                  >
                    {/* Heroicon name: shield-check */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-300 group-hover:text-indigo-200"
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Privacy
                  </a>
                </div>
              </div>
            </nav>
          </Transition.Child>

          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Transition>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-indigo-700 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Image
                className="h-8 w-auto"
                src="/logo_full.svg"
                alt="Gmc.sh logo"
                width={130}
                height={40}
                objectFit="cover"
                priority
              />
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-indigo-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                <ActiveLink
                  activeClassName="bg-indigo-800 text-white hover"
                  href="/"
                >
                  {/* Current: "bg-indigo-800 text-white", Default: "text-indigo-100 hover:text-white hover:bg-indigo-600" */}
                  <a className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600">
                    {/* Heroicon name: home */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </a>
                </ActiveLink>

                <ActiveLink
                  activeClassName="bg-indigo-800"
                  href={{
                    pathname: '/scheduler',
                    query: { page: 1, 'per-page': PER_PAGE },
                  }}
                >
                  <a className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600">
                    {/* Heroicon name: clock */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                    Scheduler
                  </a>
                </ActiveLink>
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1 ">
                  <a
                    // href="/"
                    className="group cursor-not-allowed flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                  >
                    {/* Heroicon name: cog */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>

                  <a
                    // href="/"
                    className="group cursor-not-allowed flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                  >
                    {/* Heroicon name: question-mark-circle */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Help
                  </a>

                  <a
                    // href="/"
                    className="group cursor-not-allowed flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-indigo-100 hover:text-white hover:bg-indigo-600"
                  >
                    {/* Heroicon name: shield-check */}
                    <svg
                      className="mr-4 h-6 w-6 text-indigo-200"
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Privacy
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
