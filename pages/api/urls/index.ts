import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import { db } from 'utils/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.get('user') as Pick<User, 'id'>

  const total = await db.url.count({
    where: {
      userId: user.id,
    },
  })

  const take = req.query.take ? Number(req.query.take) : 10
  const urls = await db.url.findMany({
    where: {
      userId: user.id,
    },
    take,
    ...(req.query.cursor && {
      cursor: {
        id: req.query.cursor as string,
      },
    }),
    select: {
      id: true,
      url: true,
      target: true,
      createdAt: true,
      timesVisited: true,
    },
  })

  return res.json({
    urls,
    cursor: req.query.cursor || null,
    take,
    total,
  })
}

export default withIronSession(handler, {
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
  cookieName: '__session',
})
