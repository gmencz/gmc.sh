import Footer from 'components/footer'
import Header from 'components/header'
import SubscribeToReleaseForm from 'components/subscribe-to-release-form'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { seoDefaults } from 'utils/seo-defaults'
import {
  AuthenticatedPageProps,
  withAuthServerSideProps,
} from '../utils/with-auth-server-side-props'

export const getServerSideProps = withAuthServerSideProps()

function Home({ user }: AuthenticatedPageProps) {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Free, short custom URLs</title>
        <meta name="description" content={seoDefaults.description} />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/`} />
        <meta property="og:title" content={seoDefaults.title} />
        <meta property="og:description" content={seoDefaults.description} />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content={seoDefaults.title} />
        <meta name="twitter:description" content={seoDefaults.description} />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="relative bg-gray-50 overflow-hidden">
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
          <Header isAuthenticated={!!user} />
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
                  <SubscribeToReleaseForm />
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
                  <img
                    className="w-full"
                    src="/hero.svg"
                    alt="URL illustration"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Home
