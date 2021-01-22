import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { client } from 'utils/graphql'

function useApi() {
  const { getAccessTokenSilently, user } = useAuth0()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      const accessToken = await getAccessTokenSilently()
      client.setHeader('Authorization', `Bearer ${accessToken}`)
      setIsReady(true)
    })()
  }, [getAccessTokenSilently])

  return { client, user, isReady }
}

export { useApi }
