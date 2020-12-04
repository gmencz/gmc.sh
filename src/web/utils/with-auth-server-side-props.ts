/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next'
import { V1ApiTypes } from '@gmcsh/shared'
import { getLoggedInUser } from './api/get-logged-in-user'

type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any

export type InferWithAuthServerSideProps<
  T extends (...args: any) => Promise<{ props: any }>
> = AsyncReturnType<T>['props']

type WithAuthServerSidePropsOptions = {
  authenticatedPage?: boolean
}

export type AuthenticatedPageProps = {
  user: V1ApiTypes.MeResponse
}

type EmptyProps = {
  props: Record<string, unknown>
}

type DefaultWithAuthServerSideProps = {
  user: V1ApiTypes.MeResponse
}

function withAuthServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user?: V1ApiTypes.MeResponse,
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {},
) {
  return async function getMergedServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<{ props: T['props'] & DefaultWithAuthServerSideProps }> {
    let loggedInUser: V1ApiTypes.MeResponse | null = null
    try {
      loggedInUser = await getLoggedInUser(ctx.req.headers.cookie || '')
    } catch {
      loggedInUser = null
    }

    if (options.authenticatedPage && !loggedInUser) {
      return ({
        redirect: {
          destination: '/sign-in',
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown) as { props: T['props'] & DefaultWithAuthServerSideProps }
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          user: loggedInUser,
          ...((await getServerSidePropsFunc(ctx, loggedInUser)).props || {}),
        },
      }
    }

    return {
      props: {
        user: loggedInUser,
      },
    }
  }
}

export { withAuthServerSideProps }
