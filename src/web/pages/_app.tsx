import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'

if (process.env.NODE_ENV === 'development') {
  require('../mocks')
}

export const appQueryCache = new QueryCache()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ReactQueryCacheProvider queryCache={appQueryCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </ReactQueryCacheProvider>
    </Fragment>
  )
}

export default MyApp
