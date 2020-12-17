import { User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = req.session.get('user') as Omit<User, 'password'>
  return res.json({
    ...user,
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
