import Footer from 'components/footer'
import Header from 'components/header'
import Head from 'next/head'
import { Fragment } from 'react'
import { seoDefaults } from 'utils/seo-defaults'
import {
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from 'utils/with-auth-server-side-props'

export const getServerSideProps = withAuthServerSideProps()

type PricingProps = InferWithAuthServerSideProps<typeof getServerSideProps>

function Pricing({ user }: PricingProps) {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Pricing</title>
        <meta
          name="description"
          content="Gmc.sh provides you with everything you need for $5.99 a month, includes every feature we offer for free plus unlimited branded links, your own domain names and more."
        />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/pricing`} />
        <meta property="og:title" content="Gmc.sh • Pricing" />
        <meta
          property="og:description"
          content="Gmc.sh provides you with everything you need for $5.99 a month, includes every feature we offer for free plus unlimited branded links, your own domain names and more."
        />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Gmc.sh • Pricing" />
        <meta
          name="twitter:description"
          content="Gmc.sh provides you with everything you need for $5.99 a month, includes every feature we offer for free plus unlimited branded links, your own domain names and more."
        />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="pb-16 bg-gray-50 overflow-hidden lg:pb-24">
        <div className="relative pt-6 pb-16">
          <Header isAuthenticated={!!user} />
        </div>
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="pb-16 xl:flex xl:items-center xl:justify-between">
              <div>
                <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
                  <span className="text-gray-900">
                    Everything you need for{' '}
                  </span>
                  <span className="text-indigo-600">$5.99 a month</span>
                </h1>
                <p className="mt-5 text-xl text-gray-500">
                  Includes every feature we offer for free plus unlimited
                  branded links, your own domain names and more.
                </p>
              </div>
              <button
                disabled
                className="mt-8 w-full disabled:cursor-not-allowed disabled:opacity-50 bg-indigo-600 border border-transparent px-5 py-3 inline-flex items-center justify-center text-base font-medium rounded-md text-white hover:bg-indigo-700 sm:mt-10 sm:w-auto xl:mt-0"
              >
                Get started today
              </button>
            </div>
            <div className="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
              <div>
                <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                  Everything you need
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  All-in-one platform
                </p>
                <p className="mt-4 text-lg text-gray-500">
                  Manage, share, fully customize and turn your links into
                  powerful marketing assets which attract more clicks.
                </p>
              </div>
              <div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
                <ul className="divide-y divide-gray-200">
                  <li className="py-4 flex md:py-0 md:pb-4">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Unlimited links.
                    </span>
                  </li>

                  <li className="py-4 flex">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Unlimited branded links.
                    </span>
                  </li>

                  <li className="py-4 flex">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Fully customized domain names.
                    </span>
                  </li>

                  <li className="py-4 flex">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Mobile notifications.
                    </span>
                  </li>

                  <li className="py-4 flex">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Customized analytics emails.
                    </span>
                  </li>
                </ul>
                <ul className="border-t border-gray-200 divide-y divide-gray-200 md:border-t-0">
                  <li className="py-4 flex md:border-t-0 md:py-0 md:pb-4">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Suspicious link activity monitoring.
                    </span>
                  </li>

                  <li className="py-4 flex">
                    <svg
                      className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-500">
                      Integrate with nearly every social media you love.
                    </span>
                  </li>

                  <li className="py-4 flex"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Pricing
