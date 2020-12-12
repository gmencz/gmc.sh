import AccountProfile from 'components/app/account-profile'
import Navbar from 'components/app/navbar/index'
import Head from 'next/head'
import { Fragment } from 'react'
import { QueryCache, useMutation } from 'react-query'
import { seoDefaults } from 'utils/seo-defaults'
import { currentUserLinksKey, meKey } from 'utils/react-query-keys'
import { dehydrate } from 'react-query/hydration'
import { withAuthServerSideProps } from 'utils/with-auth-server-side-props'
import { getCurrentUserLinks } from 'api/get-current-user-links'
import { updateProfilePicture } from 'api/update-profile-picture'
import { appQueryCache } from 'pages/_app'

export const getServerSideProps = withAuthServerSideProps(
  async (ctx, user) => {
    const queryCache = new QueryCache()

    await queryCache.prefetchQuery(currentUserLinksKey, () =>
      getCurrentUserLinks(ctx.req.headers.cookie as string),
    )

    queryCache.setQueryData(meKey, user)

    return {
      props: {
        dehydratedState: dehydrate(queryCache),
      },
    }
  },
  {
    authenticatedPage: true,
  },
)

function App() {
  const updateProfilePictureMutation = useMutation(updateProfilePicture, {
    onSuccess: data => {
      appQueryCache.setQueryData(meKey, data)
    },
  })

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
      <div
        className="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      ></div>
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      ></div>
      <div className="relative min-h-screen flex flex-col">
        {/* <!-- Navbar --> */}
        <Navbar />

        {/* <!-- 3 column wrapper --> */}
        <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
          {/* <!-- Left sidebar & main wrapper --> */}
          <div className="flex-1 min-w-0 bg-white xl:flex">
            {/* <!-- Account profile --> */}
            <AccountProfile />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App
