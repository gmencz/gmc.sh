import { setupServer } from 'msw/node'
import { gqlHandlers, restHandlers } from './handlers'

export const server = setupServer(...gqlHandlers, ...restHandlers)
