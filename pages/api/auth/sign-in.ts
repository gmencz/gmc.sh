import { PrismaClient } from '@prisma/client'
import { verify } from 'argon2'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'

const db = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password: plainPassword } = req.body
  const user = await db.user.findUnique({ where: { username } })

  if (!user) {
    return res.status(401).json({
      message: 'Wrong username or password, please check your spelling.',
      info: {},
    })
  }

  const validPassword = await verify(user.password, plainPassword)
  if (!validPassword) {
    return res.status(401).json({
      message: 'Wrong username or password, please check your spelling.',
      info: {},
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = user

  req.session.set('user', {
    ...safeUser,
  })

  await req.session.save()

  res.json({
    user: safeUser,
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
