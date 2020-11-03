import { PrismaClient } from '@prisma/client'
import type { DataLoader } from '@remix-run/core'
import { json } from '@remix-run/loader'
import { Request, Response } from 'express'

interface Context {
  req: Request
  res: Response
  db: PrismaClient
}

const SESSION_COOKIE_NAME = '__session'

const redirectToLogin = () => {
  return json(null, {
    status: 301,
    headers: {
      Location: '/login',
    },
  })
}

const loader: DataLoader = async ({ context }) => {
  const { req, db } = context as Context

  if (!req.cookies.__session) {
    return redirectToLogin()
  }

  const session = await db.session.findOne({
    where: {
      sessionId: req.cookies[SESSION_COOKIE_NAME],
    },
    include: {
      User: true,
    },
  })

  if (!session) {
    return redirectToLogin()
  }

  const { id, email, name, createdAt } = session.User

  return {
    user: {
      id,
      email,
      name,
      createdAt,
    },
  }
}

export = loader
