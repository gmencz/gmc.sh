import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import 'tailwindcss/tailwind.css'

export const queryCache = new QueryCache()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Component {...pageProps} />
      </ReactQueryCacheProvider>
      <ReactQueryDevtools initialIsOpen />
    </Fragment>
  )
}

export default MyApp
