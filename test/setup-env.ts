import '@testing-library/jest-dom'
import { server } from './server'
import { withIronSession } from 'next-iron-session'
import {
  applySession,
  throwOnNoCookieName,
  throwOnNoPassword,
} from './mock-iron-store'

jest.mock('next-iron-session')
;(withIronSession as jest.Mock).mockImplementation(
  (
    withIronSessionWrapperHandler,
    {
      ttl = 15 * 24 * 3600,
      cookieName = throwOnNoCookieName(),
      password = throwOnNoPassword(),
      cookieOptions = {},
    },
  ) => {
    return jest.fn().mockImplementation((...args) => {
      const handlerType = args[0] && args[1] ? 'api' : 'ssr'
      const req = handlerType === 'api' ? args[0] : args[0].req
      const res = handlerType === 'api' ? args[1] : args[0].res

      applySession(req, res, { ttl, cookieName, password, cookieOptions })

      return withIronSessionWrapperHandler(...args)
    })
  },
)

beforeAll(() => server.listen())
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())
