import SchedulerList from 'features/scheduler/list'
import Head from 'next/head'

function Scheduler() {
  return (
    <>
      <Head>
        <title>Scheduler / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        Schedules
      </h2>
      <SchedulerList />
    </>
  )
}

export default Scheduler
