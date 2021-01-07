/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next'
import auth0 from './auth0'

type AsyncReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : T extends (...args: any) => infer U
  ? U
  : any

export type InferAuthenticatedServerSideProps<
  T extends (...args: any) => Promise<{ props: any }>
> = AsyncReturnType<T>['props']

type User = Record<string, unknown>

type DefaultAuthenticatedProps = {
  user: User
}

type EmptyProps = {
  props: Record<string, unknown>
}

function authenticatedServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    user: User,
  ) => Promise<T>,
) {
  return async function getAuthenticatedServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<{ props: T['props'] & DefaultAuthenticatedProps }> {
    const session = await auth0.getSession(ctx.req)
    if (!session || !session.user) {
      return ({
        redirect: {
          destination: '/api/login',
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown) as { props: T['props'] & DefaultAuthenticatedProps }
    }

    const { user } = session

    if (getServerSidePropsFunc) {
      return {
        props: {
          user,
          ...((await getServerSidePropsFunc(ctx, user)).props || {}),
        },
      }
    }

    return {
      props: {
        user,
      },
    }
  }
}

export default authenticatedServerSideProps
