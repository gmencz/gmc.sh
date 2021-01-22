import { UserDocument, UserQuery, UserQueryVariables } from 'generated/graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import { client } from 'utils/graphql'

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    client.setHeader(
      'Authorization',
      `Bearer ${req.headers.authorization?.split(' ')[1]}`,
    )

    const { user_id } = req.body.input

    const user = await client.request<UserQuery, UserQueryVariables>(
      UserDocument,
      {
        id: user_id,
      },
    )

    if (!user.account_by_pk) {
      return res.status(401).json({
        message: `Current user was deleted or no longer exists.`,
        code: 'deleted-user',
      })
    }

    return res.status(200).json({
      user_id: user.account_by_pk.id,
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).json({
      message: error.message,
      code: 'api-error',
    })
  }
}
