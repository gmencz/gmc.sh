/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISession } from '@auth0/nextjs-auth0/dist/session/session'
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

type EmptyProps = {
  props: Record<string, unknown>
}

function authenticatedServerSideProps<T extends EmptyProps = EmptyProps>(
  getServerSidePropsFunc?: (
    ctx: GetServerSidePropsContext,
    session: ISession,
  ) => Promise<T>,
) {
  return async function getAuthenticatedServerSideProps(
    ctx: GetServerSidePropsContext,
  ): Promise<{ props: T['props'] }> {
    const session = await auth0.getSession(ctx.req)
    if (!session || !session.user) {
      return ({
        redirect: {
          destination: '/api/login',
          permanent: false,
        },
        // We have to trick the TS compiler here.
      } as unknown) as { props: T['props'] }
    }

    if (getServerSidePropsFunc) {
      return {
        props: {
          ...((await getServerSidePropsFunc(ctx, session)).props || {}),
        },
      }
    }

    return {
      props: {},
    }
  }
}

export { authenticatedServerSideProps }
