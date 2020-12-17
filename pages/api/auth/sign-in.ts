import { verify } from 'argon2'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import { db } from 'utils/db'

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.session.set('user', {
    user: safeUser,
    createdAt: new Date().toISOString(),
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await req.session.save()

  res.json({
    user: safeUser,
  })
}

export default withIronSession(handler, {
  password: '',
})
