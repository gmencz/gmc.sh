import { useQuery } from 'react-query'
import { ME_KEY } from 'utils/react-query-keys'

type MeQueryVariables = {
  refetch: boolean
}

function useMeQuery(variables: MeQueryVariables = { refetch: false }) {
  return useQuery(ME_KEY, () =>
    fetch('/api/me', {
      method: 'POST',
      body: JSON.stringify({ refetch: variables.refetch }),
      headers: {
        'content-type': 'application/json',
      },
    }).then(r => r.json()),
  )
}

export default useMeQuery
