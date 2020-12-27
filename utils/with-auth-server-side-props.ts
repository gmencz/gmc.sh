/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next'
import { SafeUser } from '@types'
import { withIronSession } from 'next-iron-session'
import { ironSessionCookieOptions } from './iron-session-cookie'
import { QueryClient } from 'react-query'
import { meKey } from './react-query-keys'
import { dehydrate } from 'react-query/hydration'

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
  user: SafeUser
}

type EmptyProps = {
  props: Record<string, unknown>
}

type DefaultWithAuthServerSideProps = {
  user: SafeUser
}

function withAuthServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user: SafeUser | null,
    queryClient: QueryClient,
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {},
) {
  return withIronSession(async function getMergedServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<{ props: T['props'] & DefaultWithAuthServerSideProps }> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const loggedInUser = ctx.req.session.get('user') || null

    if (options.authenticatedPage && !loggedInUser) {
      return ({
        redirect: {
          destination: '/sign-in',
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown) as { props: T['props'] & DefaultWithAuthServerSideProps }
    }

    const props: Record<string, unknown> = {}
    const queryClient = new QueryClient()
    if (loggedInUser) {
      queryClient.setQueryData(meKey, loggedInUser)
      props.dehydratedState = dehydrate(queryClient)
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          user: loggedInUser as SafeUser,
          ...props,
          ...((
            await getServerSidePropsFunc(
              ctx,
              loggedInUser as SafeUser,
              queryClient,
            )
          ).props || {}),
        },
      }
    }

    return {
      props: {
        user: loggedInUser as SafeUser,
        ...props,
      },
    }
  },
  ironSessionCookieOptions)
}

export { withAuthServerSideProps }
