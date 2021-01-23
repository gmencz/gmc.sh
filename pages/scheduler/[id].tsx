import { withAuthenticationRequired } from '@auth0/auth0-react'
import AuthenticationSpinner from 'components/authentication-spinner'
import Layout from 'components/layout'
import SchedulerSchedule from 'features/scheduler/schedule'
import Head from 'next/head'

function Schedule() {
  return (
    <>
      <Head>
        <title>Scheduler / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <SchedulerSchedule />
      </Layout>
    </>
  )
}

export default withAuthenticationRequired(Schedule, {
  onRedirecting: AuthenticationSpinner,
})
