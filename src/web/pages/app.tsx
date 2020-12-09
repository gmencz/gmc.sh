import Footer from 'components/footer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { seoDefaults } from 'utils/seo-defaults'
import {
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../utils/with-auth-server-side-props'

export const getServerSideProps = withAuthServerSideProps(undefined, {
  authenticatedPage: true,
})

type AppProps = InferWithAuthServerSideProps<typeof getServerSideProps>

function App({ user }: AppProps) {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Free, short custom URLs</title>
        <meta name="description" content={seoDefaults.description} />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/app`} />
        <meta property="og:title" content={seoDefaults.title} />
        <meta property="og:description" content={seoDefaults.description} />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content={seoDefaults.title} />
        <meta name="twitter:description" content={seoDefaults.description} />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="bg-gray-50 min-h-screen flex">
        <div className="p-4 flex flex-col items-center text-center max-w-lg mx-auto justify-center">
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
            Hi {user.username}.
          </h3>
          <p className="mt-3 text-lg text-gray-500">
            Thank you for becoming one of our early users, we&apos;ll keep it in
            mind. The app is currently under development so make sure to
            subscribe to our newsletter{' '}
            <Link href="/">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                here
              </a>
            </Link>{' '}
            to get notified when it&apos;s ready!
          </p>
          <div className="mt-4">
            <Image
              src="/under_development.svg"
              alt="Under development"
              width="600px"
              height="600px"
              priority
            />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default App
