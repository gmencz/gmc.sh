import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { V1ApiTypes } from '@gmcsh/shared'
import { API_ENDPOINT } from './constants'
import { ApiError } from './api-error'

async function getLoggedInUser(
  sessionCookie: string,
): Promise<V1ApiTypes.MeResponse> {
  const response = await fetch(`${API_ENDPOINT}/v1/auth/me`, {
    headers: {
      cookie: sessionCookie,
    },
  })

  const data = await response.json()
  if (response.status >= 400 && response.status < 600) {
    throw new ApiError(response.status, data as V1ApiTypes.ErrorResponse)
  }

  return data as V1ApiTypes.MeResponse
}

type WithAuthServerSidePropsOptions = {
  authenticatedPage?: boolean
}

export type AuthenticatedPageProps = {
  user: V1ApiTypes.MeResponse
}

const withAuthServerSideProps = <T>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user: V1ApiTypes.MeResponse | null,
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {},
): GetServerSideProps => async ctx => {
  let loggedInUser: V1ApiTypes.MeResponse | null = null
  try {
    loggedInUser = await getLoggedInUser(ctx.req.headers.cookie || '')
  } catch {
    loggedInUser = null
  }

  if (options.authenticatedPage && !loggedInUser) {
    ctx.res.statusCode = 302
    ctx.res.setHeader('Location', '/sign-in')
  }

  if (getServerSidePropsFunc) {
    return {
      props: {
        user: loggedInUser,
        ...((await getServerSidePropsFunc(ctx, loggedInUser)) || {}),
      },
    }
  }

  return {
    props: {
      user: loggedInUser,
    },
  }
}

export { withAuthServerSideProps }
