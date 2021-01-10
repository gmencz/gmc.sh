import { UserDocument, UserQuery, UserQueryVariables } from 'generated/graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'utils/auth0'
import { gqlProxyClient } from 'utils/gql-client'

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await auth0.getSession(req)
    if (!session || !session.user) {
      return res.status(401).json({
        message: `You must login to access this resource.`,
        code: 'unauthenticated',
      })
    }

    gqlProxyClient.setHeader('Authorization', `Bearer ${session.accessToken}`)

    const user = await gqlProxyClient.request<UserQuery, UserQueryVariables>(
      UserDocument,
      {
        id: session.user.sub,
      },
    )

    if (!user.users_by_pk) {
      return res.status(401).json({
        message: `Current user was deleted or no longer exists.`,
        code: 'deleted-user',
      })
    }

    return res.status(200).json({
      user_id: user.users_by_pk.id,
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).json({
      message: error.message,
      code: 'api-error',
    })
  }
}
