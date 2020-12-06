import Head from 'next/head'
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
      <p>Hello {user.username} 👋</p>
    </Fragment>
  )
}

export default App
