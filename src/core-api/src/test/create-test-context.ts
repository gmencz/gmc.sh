import { FastifyInstance } from 'fastify'
import { build } from 'server'
import { db } from 'utils/db'

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
