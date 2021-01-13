import '@testing-library/jest-dom'
import { server } from './server/test-server'
import { config } from 'dotenv'
import { join } from 'path'
config({ path: join(__dirname, '..', '.env.test.local') })

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
