import Head from 'next/head'

function NewSchedule() {
  return (
    <>
      <Head>
        <title>New schedule / Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          name="description"
          content="Create a new schedule and start taking advantage of our scheduler to the fullest."
        />

        <meta name="image" content="https://app.gmc.sh/generic_hero.png" />
        <meta
          name="keywords"
          content="Organize, tasks, schedules, url shortener, free"
        />

        <meta property="og:url" content="https://app.gmc.sh/new-schedule" />
        <meta property="og:title" content="New schedule / Gmc.sh" />
        <meta
          property="og:description"
          content="Create a new schedule and start taking advantage of our scheduler to the fullest."
        />
        <meta
          property="og:image"
          content="https://app.gmc.sh/generic_hero.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="gmencz" />
        <meta name="twitter:title" content="New schedule / Gmc.sh" />
        <meta
          name="twitter:description"
          content="Create a new schedule and start taking advantage of our scheduler to the fullest."
        />
        <meta
          name="twitter:image"
          content="https://app.gmc.sh/generic_hero.png"
        />
      </Head>
      <p>Create schedule</p>
      {/* <Layout>
        <CreateScheduleFormStepOne />
      </Layout> */}
    </>
  )
}

export default NewSchedule
