import { PrismaClient } from '@prisma/client'
import { DataLoader } from '@remix-run/core'
import { json } from '@remix-run/loader'
import { Request, Response } from 'express'

interface Context {
  req: Request
  res: Response
  db: PrismaClient
}

const loader: DataLoader = async ({ context }) => {
  const { req, db } = context as Context
  const sessionCookie = req.cookies.__session

  if (!sessionCookie) {
    return json({ user: null }, { status: 401 })
  }

  const dbSession = await db.session.findOne({
    where: {
      sessionId: sessionCookie,
    },
    include: {
      User: true,
    },
  })

  if (!dbSession) {
    return json({ user: null }, { status: 401 })
  }

  const { email, name, createdAt } = dbSession.User
  return json({ user: { email, name, createdAt } })
}

export = loader
