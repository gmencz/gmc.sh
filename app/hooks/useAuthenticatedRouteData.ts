import { User } from '@prisma/client'
import { useGlobalData } from '@remix-run/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface GlobalData {
  user: Pick<User, 'email' | 'name' | 'createdAt'> | null
}

function useAuthenticatedRouteData() {
  const data = useGlobalData<GlobalData>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!data.user) {
      navigate('/login')
    }
  }, [])

  return data
}

export { useAuthenticatedRouteData }
