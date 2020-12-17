/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next'
import { getLoggedInUser } from './api/get-logged-in-user'
import parseCookies from 'next-cookies'
import { User } from '@prisma/client'

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
  user: User
}

type EmptyProps = {
  props: Record<string, unknown>
}

type DefaultWithAuthServerSideProps = {
  user: User
}

function withAuthServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user?: User,
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {},
) {
  return async function getMergedServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<{ props: T['props'] & DefaultWithAuthServerSideProps }> {
    const cookies = parseCookies(ctx)
    const sessionCookie = cookies.__session

    let loggedInUser: User | null = null
    try {
      if (sessionCookie) {
        loggedInUser = await getLoggedInUser(ctx.req.headers.cookie as string)
      }
    } catch (err) {
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
          user: loggedInUser as User,
          ...((await getServerSidePropsFunc(ctx, loggedInUser as User)).props ||
            {}),
        },
      }
    }

    return {
      props: {
        user: loggedInUser as User,
      },
    }
  }
}

export { withAuthServerSideProps }
