import { Session } from 'next-iron-session'
import { applySession } from './mock-iron-store'

export default async function createTestIronSession() {
  const req: { session?: Session; headers: Record<string, string> } = {
    headers: {},
  }

  const res = {
    setHeader: jest.fn(),
    getHeader: jest.fn(),
  }

  let session: Session
  await applySession(req, res, {
    password: process.env.SESSION_PASSWORD as string,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'strict',
    },
    cookieName: '__session',
  })

  if (req.session) {
    session = req.session
  } else {
    throw new Error('No session after apply session')
  }

  return {
    req,
    res,
    session,
  }
}
