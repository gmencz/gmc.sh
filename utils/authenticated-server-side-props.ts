/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import auth0 from './auth0'
import { ME_KEY } from './react-query-keys'

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

    const { user } = session
    const queryClient = new QueryClient()
    queryClient.setQueryData(ME_KEY, user)
    const dehydratedState = dehydrate(queryClient)

    if (getServerSidePropsFunc) {
      return {
        props: {
          dehydratedState,
          ...((await getServerSidePropsFunc(ctx, user)).props || {}),
        },
      }
    }

    return {
      props: {
        dehydratedState,
      },
    }
  }
}

export { authenticatedServerSideProps }
