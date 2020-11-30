import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { build } from 'server'

type Context = {
  server: FastifyInstance
  db: PrismaClient
}

export function createTestContext(): Context {
  const ctx = {} as Context

  beforeAll(() => {
    ctx.server = build({ disableLogger: true })
    ctx.db = new PrismaClient()
  })

  afterAll(async () => {
    await ctx.db.$disconnect()
    await ctx.server.close()
  })

  return ctx
}
