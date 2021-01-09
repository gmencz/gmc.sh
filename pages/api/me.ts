import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'utils/auth0'

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { refetch } = req.body
    await auth0.handleProfile(req, res, { refetch })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
