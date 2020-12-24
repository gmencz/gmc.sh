import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const catchHandler = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    return await handler(req, res)
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      error,
    })
  }
}

export { catchHandler }
