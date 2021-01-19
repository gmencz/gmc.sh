import Toast from 'components/toast'
import ToastContainer from 'components/toast-container'
import Router from 'next/router'
import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import { ToastProvider } from 'react-toast-notifications'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'styles/custom-nprogress.css'
import 'tailwindcss/tailwind.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
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
