import React, { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { NextRouter } from 'next/router'
import '@testing-library/jest-dom'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { ImageProps } from 'next/image'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

// We're doing this because next/image won't work with external images
// because this needs to be set up in next.config.js.
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, className, width, height }: ImageProps) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    )
  },
}))

const queryCache = new QueryCache()

const renderWithRouter = (component: ReactElement): RenderResult => {
  return render(
    <ReactQueryCacheProvider queryCache={queryCache}>
      <RouterContext.Provider value={mockRouter}>
        {component}
      </RouterContext.Provider>
      ,
    </ReactQueryCacheProvider>,
  )
}

export * from '@testing-library/react'
export { renderWithRouter as render }
