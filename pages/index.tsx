import AccountOverview from 'features/account-overview'
import Head from 'next/head'

function Index() {
  return (
    <>
      <Head>
        <title>Home / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AccountOverview />
    </>
  )
}

export default Index
