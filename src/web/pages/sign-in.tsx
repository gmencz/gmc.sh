import Head from 'next/head'
import Image from 'next/image'
import { Fragment } from 'react'
import Link from 'next/link'
import SignInForm from '../components/sign-in-form'
import { seoDefaults } from 'utils/seo-defaults'

function SignIn() {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Sign in to your account</title>
        <meta name="description" content={seoDefaults.description} />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/sign-in`} />
        <meta property="og:title" content="Gmc.sh • Sign in to your account" />
        <meta property="og:description" content={seoDefaults.description} />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Gmc.sh • Sign in to your account" />
        <meta name="twitter:description" content={seoDefaults.description} />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <Link href="/">
              <a>
                <Image
                  className="mx-auto h-12 w-auto"
                  src="/logo.svg"
                  alt="Gmc.sh logo"
                  width="55px"
                  height="50px"
                  priority
                />
              </a>
            </Link>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </Fragment>
  )
}

export default SignIn
