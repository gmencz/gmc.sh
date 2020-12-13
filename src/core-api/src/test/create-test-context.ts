import { FastifyInstance } from 'fastify'
import { build } from '../server'
import { db } from 'utils/db'

// Stop azure from trying to reach our azure services
// when building our server.
jest.mock('@azure/cognitiveservices-computervision')
jest.mock('@azure/ms-rest-js')
jest.mock('@azure/storage-blob', () => ({
  BlobServiceClient: {
    fromConnectionString: () => ({
      getContainerClient: () => ({}),
    }),
  },
}))

type Context = {
  server: FastifyInstance
}

export function createTestContext(): Context {
  const ctx = {} as Context

  beforeAll(() => {
    ctx.server = build({ disableLogger: true })
  })

  afterAll(async () => {
    await ctx.server.close()
    await db.$disconnect()
  })

  return ctx
}
