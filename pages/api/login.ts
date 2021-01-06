import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from '../../utils/auth0'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { screen_hint } = req.query
    if (req.query.screen_hint) {
      await auth0.handleLogin(req, res, {
        authParams: {
          screen_hint,
        },
        redirectTo: '/',
      })
    } else {
      await auth0.handleLogin(req, res, {
        redirectTo: '/',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}
