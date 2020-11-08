import { PrismaClient } from '@prisma/client'
import type { DataLoader } from '@remix-run/core'
import { json } from '@remix-run/loader'
import { Request, Response } from 'express'

interface Context {
  req: Request
  res: Response
  db: PrismaClient
}

const loader: DataLoader = async ({ context }) => {
  const { db, req } = context as Context

  const session = await db.session.findOne({
    where: {
      sessionId: req.cookies.__session,
    },
    include: {
      User: {
        include: {
          Url: {
            select: {
              id: true,
              createdAt: true,
              shortened: true,
              target: true,
            },
          },
        },
      },
    },
  })

  if (!session) {
    return json([])
  }

  return json(session.User.Url)
}

export = loader
