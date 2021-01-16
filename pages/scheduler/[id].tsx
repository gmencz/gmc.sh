import Layout from 'components/layout'
import SchedulerSchedule from 'features/scheduler/schedule'
import { ScheduleDocument, ScheduleQueryVariables } from 'generated/graphql'
import Head from 'next/head'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { authenticatedServerSideProps } from 'utils/authenticated-server-side-props'
import { gqlProxyClient } from 'utils/gql-client'

export const getServerSideProps = authenticatedServerSideProps(
  async (ctx, { accessToken }) => {
    gqlProxyClient.setHeader('Authorization', `Bearer ${accessToken}`)
    gqlProxyClient.setHeader('Cookie', ctx.req.headers.cookie || '')
    const queryClient = new QueryClient()
    const scheduleId = ctx.params?.id as string | undefined
    if (!scheduleId) {
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      }
    }

    const variables: ScheduleQueryVariables = {
      id: scheduleId,
    }

    await queryClient.prefetchQuery(['Schedule', variables], async () => {
      return gqlProxyClient.request(ScheduleDocument, variables)
    })

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  },
)

function Schedule() {
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
        <SchedulerSchedule />
      </Layout>
    </>
  )
}

export default Schedule
