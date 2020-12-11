import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import 'tailwindcss/tailwind.css'

const queryCache = new QueryCache()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen />
      </ReactQueryCacheProvider>
    </Fragment>
  )
}

export default MyApp
