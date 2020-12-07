import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import ActiveLink from './active-link'
import MobileMenu from './mobile-menu'

type HeaderProps = {
  isAuthenticated: boolean
}

function Header({ isAuthenticated }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Fragment>
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 z-10"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <ActiveLink activeClassName="text-indigo-500" href="/">
              <a>
                <span className="sr-only">Gmc.sh logo</span>
                <Image
                  className="h-8 w-auto sm:h-10"
                  src="/logo.svg"
                  alt="Gmc.sh logo"
                  width="55px"
                  height="50px"
                  priority
                />
              </a>
            </ActiveLink>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                id="main-menu"
                aria-haspopup="true"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:space-x-10">
            <ActiveLink activeClassName="text-indigo-500" href="/features">
              <a className="font-medium text-gray-500 hover:text-gray-900">
                Features
              </a>
            </ActiveLink>

            <ActiveLink activeClassName="text-indigo-500" href="/pricing">
              <a className="font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </a>
            </ActiveLink>

            <ActiveLink activeClassName="text-indigo-500" href="/blog">
              <a className="font-medium text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </ActiveLink>
          </div>
        </div>
        {isAuthenticated ? (
          <div className="hidden md:block text-right">
            <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
              <Link href="/app">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                  Open app in browser
                </a>
              </Link>
            </span>
          </div>
        ) : (
          <div className="hidden md:block text-right">
            <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
              <Link href="/sign-in">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                  Sign in
                </a>
              </Link>
            </span>
          </div>
        )}
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </Fragment>
  )
}

export default Header
