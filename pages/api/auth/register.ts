import { PrismaClientKnownRequestError, User } from '@prisma/client'
import { hash } from 'argon2'
import { nanoid as uniqueId } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession } from 'next-iron-session'
import { catchHandler } from 'utils/catch-handler'
import db from 'utils/db'
import { ironSessionCookieOptions } from 'utils/iron-session-cookie'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, username, password } = req.body
  const hashedPassword = await hash(password)

  let user: User
  try {
    user = await db.user.create({
      data: {
        id: `u-${uniqueId()}`,
        email,
        password: hashedPassword,
        username,
      },
    })
  } catch (error) {
    console.error(error)

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const { target } = error?.meta as { target: string[] }
        return res.status(409).json({
          message: `Taken ${target.join(', ')}.`,
          info: {
            ...error,
          },
        })
      }
    }

    return res.status(500).json({
      message: 'Server error',
      info: {
        ...error,
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...safeUser } = user

  req.session.set('user', {
    ...safeUser,
  })

  await req.session.save()

  res.json({
    user: safeUser,
  })
}

export default withIronSession(catchHandler(handler), ironSessionCookieOptions)
