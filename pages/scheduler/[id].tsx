import SchedulerSchedule from 'features/scheduler/schedule'
import Head from 'next/head'

function Schedule() {
  return (
    <>
      <Head>
        <title>Scheduler / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SchedulerSchedule />
    </>
  )
}

export default Schedule
