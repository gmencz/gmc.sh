import Footer from 'components/footer'
import Header from 'components/header'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { seoDefaults } from 'utils/seo-defaults'

function PrivacyPolicy() {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Privacy policy</title>
        <meta
          name="description"
          content="Read about how we use your data in our privacy policy, we care about the protection of your data."
        />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta
          property="og:url"
          content={`https://app.gmc.sh/legal/privacy-policy`}
        />
        <meta property="og:title" content="Gmc.sh • Privacy policy" />
        <meta
          property="og:description"
          content="Read about how we use your data in our privacy policy, we care about the protection of your data."
        />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Gmc.sh • Privacy policy" />
        <meta
          name="twitter:description"
          content="Read about how we use your data in our privacy policy, we care about the protection of your data."
        />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="pb-16 bg-gray-50 overflow-hidden lg:pb-24">
        <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
          <Header isAuthenticated={false} />
          <div className="relative py-16 bg-gray-50 overflow-hidden">
            <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
              <div
                className="relative h-full text-lg max-w-prose mx-auto"
                aria-hidden="true"
              >
                <svg
                  className="absolute top-12 left-full transform translate-x-32"
                  width="404"
                  height="384"
                  fill="none"
                  viewBox="0 0 404 384"
                >
                  <defs>
                    <pattern
                      id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
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
                    height="384"
                    fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                  />
                </svg>
                <svg
                  className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
                  width="404"
                  height="384"
                  fill="none"
                  viewBox="0 0 404 384"
                >
                  <defs>
                    <pattern
                      id="f210dbf6-a58d-4871-961e-36d5016a0f49"
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
                    height="384"
                    fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                  />
                </svg>
                <svg
                  className="absolute bottom-12 left-full transform translate-x-32"
                  width="404"
                  height="384"
                  fill="none"
                  viewBox="0 0 404 384"
                >
                  <defs>
                    <pattern
                      id="d3eb07ae-5182-43e6-857d-35c643af9034"
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
                    height="384"
                    fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                  />
                </svg>
              </div>
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8">
              <div className="text-lg max-w-prose mx-auto">
                <h1>
                  <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                    We care about the protection of your data
                  </span>
                  <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Privacy policy
                  </span>
                </h1>
                <p className="mt-8 text-xl prose prose-indigo text-gray-500 leading-8">
                  This Privacy Policy describes how your personal information is
                  collected, used, and shared when you visit or make a purchase
                  from <a href="https://app.gmc.sh">https://app.gmc.sh</a> (the
                  “Site”).
                </p>
              </div>
              <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                <h2>Personal information we collect</h2>
                <p>
                  When you visit the Site, we automatically collect certain
                  information about your device, including information about
                  your web browser, IP address, time zone, and some of the
                  cookies that are installed on your device. Additionally, as
                  you browse the Site, we collect information about the
                  individual web pages or products that you view, what websites
                  or search terms referred you to the Site, and information
                  about how you interact with the Site. We refer to this
                  automatically-collected information as “Device Information.”
                </p>
                <p>
                  We collect Device Information using the following
                  technologies:
                </p>
                <ul>
                  <li>
                    “Cookies” are data files that are placed on your device or
                    computer and often include an anonymous unique identifier.
                    For more information about cookies, and how to disable
                    cookies, visit{' '}
                    <a href="https://www.allaboutcookies.org">
                      https://www.allaboutcookies.org.
                    </a>
                  </li>
                  <li>
                    “Log files” track actions occurring on the Site, and collect
                    data including your IP address, browser type, Internet
                    service provider, referring/exit pages, and date/time
                    stamps.
                  </li>
                </ul>
                <p>
                  When we talk about “Personal Information” in this Privacy
                  Policy, we are talking about Device Information.
                </p>
                <h2>How do we use your personal information?</h2>
                <p>
                  We use the Device Information that we collect to help us
                  screen for potential risk and fraud (in particular, your IP
                  address), and more generally to improve and optimize our Site
                  (for example, by generating analytics about how our customers
                  browse and interact with the Site, and to assess the success
                  of our marketing and advertising campaigns).
                </p>
                <h2>Sharing your personal information</h2>
                <p>
                  We use Google Analytics to help us understand how our
                  customers use the Site--you can read more about how Google
                  uses your Personal Information here:{' '}
                  <a href="https://www.google.com/intl/en/policies/privacy/">
                    https://www.google.com/intl/en/policies/privacy/
                  </a>
                  . You can also opt-out of Google Analytics here:{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout">
                    https://tools.google.com/dlpage/gaoptout
                  </a>
                  .
                </p>
                <p>
                  Finally, we may also share your Personal Information to comply
                  with applicable laws and regulations, to respond to a
                  subpoena, search warrant or other lawful request for
                  information we receive, or to otherwise protect our rights.
                </p>
                <p>
                  If you are a European resident, you have the right to access
                  personal information we hold about you and to ask that your
                  personal information be corrected, updated, or deleted. If you
                  would like to exercise this right, please contact us through
                  the contact information below.
                </p>
                <h2>Changes</h2>
                <p>
                  We may update this privacy policy from time to time in order
                  to reflect, for example, changes to our practices or for other
                  operational, legal or regulatory reasons.
                </p>
                <h2>Contact us</h2>
                <p>
                  For more information about our privacy practices, if you have
                  questions, or if you would like to make a complaint, please
                  contact us by e-mail at{' '}
                  <a href="mailto:info@gmc.sh">info@gmc.sh</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default PrivacyPolicy
