import CreateAccountForm from 'components/create-account-form'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { seoDefaults } from 'utils/seo-defaults'

function CreateAccount() {
  return (
    <Fragment>
      <Head>
        <title>Gmc.sh • Create your account</title>
        <meta name="description" content={seoDefaults.description} />
        <meta name="image" content={seoDefaults.image} />
        <meta name="keywords" content={seoDefaults.keywords} />

        <meta property="og:url" content={`https://app.gmc.sh/create-account`} />
        <meta property="og:title" content="Gmc.sh • Create your account" />
        <meta property="og:description" content={seoDefaults.description} />
        <meta property="og:image" content={seoDefaults.image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Gmc.sh • Create your account" />
        <meta name="twitter:description" content={seoDefaults.description} />
        <meta name="twitter:image" content={seoDefaults.image} />
      </Head>
      <div className="min-h-screen bg-gray-50 overflow-hidden flex items-center justify-center">
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
          <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md flex flex-col">
            <Image
              src="/logo.svg"
              alt="Gmc.sh logo"
              width="40px"
              height="40px"
              priority
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 max-w">
              Or{' '}
              <Link href="/sign-in">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  sign in
                </a>
              </Link>
            </p>
          </div>
          <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
            <div className="px-4 py-8 sm:px-10">
              <div className="mt-6">
                <CreateAccountForm />
              </div>
            </div>
            <div className="px-4 py-6 bg-white border-t-2 border-gray-200 sm:px-10">
              <p className="text-xs leading-5 text-gray-500">
                By creating an account, you agree to our{' '}
                <Link href="/legal/privacy-policy">
                  <a className="font-medium text-gray-900 hover:underline">
                    Terms of Service
                  </a>
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy-policy">
                  <a className="font-medium text-gray-900 hover:underline">
                    Privacy Policy
                  </a>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateAccount
