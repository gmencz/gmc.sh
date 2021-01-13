import Head from 'next/head'
import { authenticatedServerSideProps } from 'utils/authenticated-server-side-props'
import Layout from 'components/layout'
import SchedulerList, { PER_PAGE } from 'features/scheduler/list'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { gqlProxyClient } from 'utils/gql-client'
import { MySchedulesDocument } from 'generated/graphql'

export const getServerSideProps = authenticatedServerSideProps(
  async (ctx, { accessToken }) => {
    gqlProxyClient.setHeader('Authorization', `Bearer ${accessToken}`)
    gqlProxyClient.setHeader('Cookie', ctx.req.headers.cookie || '')
    const queryClient = new QueryClient()

    const page = Number(ctx.query.page) || 1
    const perPage = Number(ctx.query['per-page']) || PER_PAGE
    const offset = page === 1 ? 0 : (page - 1) * perPage

    const variables = {
      limit: perPage,
      offset,
    }

    await queryClient.prefetchQuery(['MySchedules', variables], async () => {
      return gqlProxyClient.request(MySchedulesDocument, variables)
    })

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  },
)

function Scheduler() {
  return (
    <>
      <Head>
        <title>Scheduler / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Manage your schedules effectively with our best-in-class scheduler."
        />

        <meta name="image" content="https://app.gmc.sh/generic_hero.png" />
        <meta
          name="keywords"
          content="Organize, tasks, schedules, url shortener, free"
        />

        <meta property="og:url" content="https://app.gmc.sh/scheduler" />
        <meta property="og:title" content="Scheduler / Gmc.sh" />
        <meta
          property="og:description"
          content="Manage your schedules effectively with our best-in-class scheduler."
        />
        <meta
          property="og:image"
          content="https://app.gmc.sh/generic_hero.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="Scheduler / Gmc.sh" />
        <meta
          name="twitter:description"
          content="Manage your schedules effectively with our best-in-class scheduler."
        />
        <meta
          name="twitter:image"
          content="https://app.gmc.sh/generic_hero.png"
        />
      </Head>
      <Layout>
        <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
          Schedules
        </h2>

        {/* Activity list */}
        <SchedulerList />
      </Layout>
    </>
  )
}

export default Scheduler
