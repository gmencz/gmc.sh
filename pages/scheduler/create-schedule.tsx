import { withAuthenticationRequired } from '@auth0/auth0-react'
import AuthenticationSpinner from 'components/authentication-spinner'
import CreateScheduleFormStepOne from 'features/scheduler/create-schedule-form/step-1'
import Head from 'next/head'

function NewSchedule() {
  return (
    <>
      <Head>
        <title>New schedule / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CreateScheduleFormStepOne />
    </>
  )
}

export default withAuthenticationRequired(NewSchedule, {
  onRedirecting: AuthenticationSpinner,
})
