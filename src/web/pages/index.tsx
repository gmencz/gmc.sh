import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import MobileMenu from '../components/mobile-menu'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Free, short custom URLs</title>
      </Head>
      <div className="relative bg-white overflow-hidden">
        <div
          className="hidden lg:block lg:absolute lg:inset-0"
          aria-hidden="true"
        >
          <svg
            className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
            width="640"
            height="784"
            fill="none"
            viewBox="0 0 640 784"
          >
            <defs>
              <pattern
                id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                x="118"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              y="72"
              width="640"
              height="640"
              className="text-gray-50"
              fill="currentColor"
            />
            <rect
              x="118"
              width="404"
              height="784"
              fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
            />
          </svg>
        </div>
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <nav
            className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
            aria-label="Global"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/">
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
                </Link>
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
                <Link href="/why-gmc-sh">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    Why Gmc.sh?
                  </a>
                </Link>

                <Link href="/features">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    Features
                  </a>
                </Link>

                <Link href="/pricing">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    Pricing
                  </a>
                </Link>

                <Link href="/blog">
                  <a className="font-medium text-gray-500 hover:text-gray-900">
                    Blog
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
                <Link href="/sign-in">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
                    Sign in
                  </a>
                </Link>
              </span>
            </div>
          </nav>

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />

          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                    Coming soon
                  </span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">
                      Get rid of those
                    </span>
                    <span className="block text-indigo-600">
                      long and boring links.
                    </span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  A URL shortener built with the most powerful tools available
                  to help you and your brand grow and gain the trust of your
                  customers.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <p className="text-base font-medium text-gray-900">
                    Sign up to get notified when it’s ready.
                  </p>
                  <form action="#" method="POST" className="mt-3 sm:flex">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      disabled
                      className="mt-3 disabled:opacity-50 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto cursor-not-allowed"
                    >
                      Notify me
                    </button>
                  </form>
                  <p className="mt-3 text-sm text-gray-500">
                    We care about the protection of your data. Read our{' '}
                    <Link href="/legal/privacy-policy">
                      <a className="font-medium text-gray-900 underline">
                        Privacy Policy
                      </a>
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <svg
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                  width="640"
                  height="784"
                  fill="none"
                  viewBox="0 0 640 784"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                      x="118"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    y="72"
                    width="640"
                    height="640"
                    className="text-gray-50"
                    fill="currentColor"
                  />
                  <rect
                    x="118"
                    width="404"
                    height="784"
                    fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                  />
                </svg>
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md bg-white p-7">
                  <span className="sr-only">Shorten URLs with ease</span>
                  <img className="w-full" src="/hero.svg" alt="" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Fragment>
  )
}
