import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useMeQuery } from 'generated/graphql'
import { useApi } from 'hooks/use-api'
import Head from 'next/head'

function Index() {
  const { client, isReady, user } = useApi()
  const meQuery = useMeQuery(
    client,
    { userId: user.sub },
    { enabled: isReady, staleTime: Infinity },
  )

  console.log(meQuery)

  return (
    <>
      <Head>
        <title>Home / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Hi</p>
      {/* <Layout>
        <AccountOverview />
      </Layout> */}
    </>
  )
}

export default withAuthenticationRequired(Index)
