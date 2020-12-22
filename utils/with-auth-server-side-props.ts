/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next'
import { SafeUser } from '@types'
import { withIronSession } from 'next-iron-session'

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
    user?: SafeUser,
  ) => Promise<T>,
  options: WithAuthServerSidePropsOptions = {},
) {
  return withIronSession(
    async function getMergedServerSideProps(
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

      if (getServerSidePropsFunc) {
        return {
          props: {
            user: loggedInUser as SafeUser,
            ...((await getServerSidePropsFunc(ctx, loggedInUser as SafeUser))
              .props || {}),
          },
        }
      }

      return {
        props: {
          user: loggedInUser as SafeUser,
        },
      }
    },
    {
      password: process.env.SESSION_PASSWORD as string,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
      },
      cookieName: '__session',
    },
  )
}

export { withAuthServerSideProps }
