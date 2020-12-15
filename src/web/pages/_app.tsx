import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'

if (process.env.NODE_ENV === 'development') {
  require('../mocks')
}

export const appQueryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <QueryClientProvider client={appQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Fragment>
  )
}

export default MyApp
