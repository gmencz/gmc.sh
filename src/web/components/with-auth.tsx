import { V1ApiTypes } from '@gmcsh/shared'
import { useRouter } from 'next/dist/client/router'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function withAuthComponent(Component: any) {
  // eslint-disable-next-line react/display-name
  return (props: { user: V1ApiTypes.MeResponse | null; data: any }) => {
    const router = useRouter()
    const { user } = props

    if (!user) {
      router.push('/sign-in')
      return
    }

    return <Component {...props} />
  }
}
