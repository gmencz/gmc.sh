import { IClaims } from '@auth0/nextjs-auth0/dist/session/session'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import auth0 from 'utils/auth0'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await auth0.getSession(req)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    },
  }
}

type Props = {
  user: IClaims
}

function Index({ user }: Props) {
  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Gmc.sh</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p className="mb-2">Hi 🙋‍♂️!</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        href="/api/logout"
      >
        Logout
      </a>
    </div>
  )
}

export default Index
