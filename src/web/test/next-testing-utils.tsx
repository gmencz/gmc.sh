import React, { ReactElement } from 'react'
import { render, RenderResult } from '@testing-library/react'
import { NextRouter } from 'next/router'
import '@testing-library/jest-dom'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

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
  prefetch: jest.fn().mockResolvedValue(undefined), // This one fixed it for me
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
}

const renderWithRouter = (component: ReactElement): RenderResult => {
  return render(
    <RouterContext.Provider value={mockRouter}>
      {component}
    </RouterContext.Provider>,
  )
}

export * from '@testing-library/react'
export { renderWithRouter as render }
