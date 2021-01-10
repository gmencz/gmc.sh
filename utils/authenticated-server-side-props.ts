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

type DefaultProps = {
  userId: string
}

type EmptyProps = {
  props: Record<string, unknown>
}

function authenticatedServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    userId: string,
  ) => Promise<T>,
) {
  return async function getAuthenticatedServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<{ props: T['props'] & DefaultProps }> {
    const session = await auth0.getSession(ctx.req)
    if (!session || !session.user) {
      return ({
        redirect: {
          destination: '/api/login',
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown) as { props: T['props'] & DefaultProps }
    }

    const { user } = session
    if (getServerSidePropsFunc) {
      return {
        props: {
          userId: user.sub,
          ...((await getServerSidePropsFunc(ctx, user.sub)).props || {}),
        },
      }
    }

    return {
      props: {
        userId: user.sub,
      },
    }
  }
}

export { authenticatedServerSideProps }
