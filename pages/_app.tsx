import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

export const appQueryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
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

export default App
