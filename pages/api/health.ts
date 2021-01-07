import { NextApiRequest, NextApiResponse } from 'next'

export default async function me(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send('Gmc.sh is OK!')
}
