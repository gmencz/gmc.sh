import Toast from 'components/toast'
import ToastContainer from 'components/toast-container'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { ToastProvider } from 'react-toast-notifications'
import { AuthConfig } from 'react-use-auth'
import { Auth0 } from 'react-use-auth/auth0'
import SlowNetProgressBar from 'components/slow-net-progress-bar'
import 'nprogress/nprogress.css'
import 'styles/custom-nprogress.css'
import 'tailwindcss/tailwind.css'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <Fragment>
      <SlowNetProgressBar />
      <AuthConfig
        navigate={(url: string) => router.push(url)}
        authProvider={Auth0}
        params={{
          domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
          clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ToastProvider components={{ Toast, ToastContainer }}>
            <Component {...pageProps} />
          </ToastProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
