import { setupWorker } from 'msw'
import { gqlHandlers, restHandlers } from './handlers'

export const worker = setupWorker(...gqlHandlers, ...restHandlers)
