import { SessionOptions } from 'next-iron-session'

const ironSessionCookieOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  },
  cookieName: '__session',
}

export { ironSessionCookieOptions }
