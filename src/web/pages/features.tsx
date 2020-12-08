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

type FeaturesProps = InferWithAuthServerSideProps<typeof getServerSideProps>

function Features({ user }: FeaturesProps) {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Features</title>
        <meta
          name="description"
          content="Find out what Gmc.sh can do for you and how it can help your business shine. Try it for free to learn more."
        />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/features`} />
        <meta property="og:title" content="Gmc.sh • Features" />
        <meta
          property="og:description"
          content="Find out what Gmc.sh can do for you and how it can help your business shine. Try it for free to learn more."
        />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Gmc.sh • Features" />
        <meta
          name="twitter:description"
          content="Find out what Gmc.sh can do for you and how it can help your business shine. Try it for free to learn more."
        />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="pb-16 bg-gray-50 overflow-hidden lg:pb-24">
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <Header isAuthenticated={!!user} />
          <div className="relative mt-16 max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <svg
              className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                  x="0"
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
                width="404"
                height="784"
                fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
              />
            </svg>

            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to use links
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                Gmc.sh helps you manage, monitor, share and fully customize
                links to fit your needs.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  Be more productive
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Managing and monitoring your links shouldn&apos;t be a hassle.
                  Gmc.sh helps you do this with just a few clicks, with features
                  like branded links, the ability to redirect any link and more.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Branded links
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        We help you build links around a brand name or related
                        term that helps to associate the company with the links,
                        content and information you share online.
                      </dd>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Redirect any link
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        Make every link you can think of your own and customize
                        it to fit your needs.
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <svg
                  className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                  width="784"
                  height="404"
                  fill="none"
                  viewBox="0 0 784 404"
                >
                  <defs>
                    <pattern
                      id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                      x="0"
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
                    width="784"
                    height="404"
                    fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
                  />
                </svg>
                <img
                  className="relative mx-auto"
                  width="490"
                  src="/features_productive.svg"
                  alt="Be productive"
                />
              </div>
            </div>

            <svg
              className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x="0"
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
                width="404"
                height="784"
                fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
              />
            </svg>

            <div className="relative mt-12 sm:mt-16 lg:mt-24">
              <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                    Always in the loop
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Get real-time analytics of your links so you can find out
                    how they&apos;re being used, how much they&apos;re being
                    used and more.
                  </p>

                  <dl className="mt-10 space-y-10">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
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
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                          Mobile notifications
                        </dt>
                        <dd className="mt-2 text-base text-gray-500">
                          Set up mobile notifications so you can manage and look
                          at your links analytics from anywhere at any time.
                        </dd>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
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
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                          Helpful emails
                        </dt>
                        <dd className="mt-2 text-base text-gray-500">
                          Opt-in to emails that let you know if there are any
                          spikes in your analytics and what caused them.
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                  <img
                    className="relative mx-auto"
                    width="440"
                    src="/features_analytics.svg"
                    alt="Analytics"
                  />
                </div>
              </div>
            </div>

            <svg
              className="hidden lg:block absolute left-full transform -translate-x-1/2 translate-y-12"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                  x="0"
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
                width="404"
                height="784"
                fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
              />
            </svg>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3
                  id="security"
                  className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl"
                >
                  Rest assured with secure links
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Every link you create using Gmc.sh is encrypted with HTTPS to
                  maximize protection against the bad guys and make your
                  customers feel safe.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8v-4zm11 16h-14v-10h14v10z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Robust links
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        Opt-in to extra security on your links like suspicious
                        activity monitoring, DDoS monitoring and more.
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <img
                  className="relative mx-auto"
                  width="460"
                  src="/features_security.svg"
                  alt="Robust links"
                />
              </div>
            </div>
            <div className="relative mt-12 sm:mt-16 lg:mt-24">
              <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                    Get your links out there!
                  </h3>
                  <p className="mt-3 text-lg text-gray-500">
                    Gmc.sh integrates with nearly every social media and tool
                    you love, saving you time and hassle.
                  </p>

                  <dl className="mt-10 space-y-10">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <dt className="text-lg leading-6 font-medium text-gray-900">
                          Automated tweets
                        </dt>
                        <dd className="mt-2 text-base text-gray-500">
                          Let your customers know about your links and how they
                          can help them with automated tweets.
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                  <img
                    className="relative mx-auto"
                    width="440"
                    src="/features_tweets.svg"
                    alt="Automated tweets"
                  />
                </div>
              </div>

              <svg
                className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
                width="404"
                height="784"
                fill="none"
                viewBox="0 0 404 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x="0"
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
                  width="404"
                  height="784"
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                  More attractive links with custom domain names
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                  Make your links recognizable turning them into powerful
                  marketing assets. Custom links turn &quot;gmc.sh&quot; into
                  &quot;mycompany.gmc.sh&quot;.
                </p>

                <dl className="mt-10 space-y-10">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg
                          className="h-6 w-6"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Fully customizable
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        If you&apos;re not happy with the basic domain name
                        functionality, you can upgrade your plan and replace
                        &quot;gmc.sh&quot; with your own domain name.
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <img
                  className="relative mx-auto"
                  width="450"
                  src="/features_customizable.svg"
                  alt="Robust links"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Features
