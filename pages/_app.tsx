import Toast from 'components/toast'
import ToastContainer from 'components/toast-container'
import Router from 'next/router'
import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { ToastProvider } from 'react-toast-notifications'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import SlowNetProgressBar from 'components/slow-net-progress-bar'
import 'nprogress/nprogress.css'
import 'styles/custom-nprogress.css'
import 'tailwindcss/tailwind.css'

const authRedirect = (appState: AppState) => {
  Router.replace(appState.returnTo || '/')
}

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <SlowNetProgressBar />
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
        audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
        scope="read:users"
        onRedirectCallback={authRedirect}
        redirectUri={
          typeof window !== 'undefined' ? window.location.origin : undefined
        }
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ToastProvider components={{ Toast, ToastContainer }}>
              <Component {...pageProps} />
            </ToastProvider>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Auth0Provider>
    </Fragment>
  )
}

export default App
