import { useRouteData } from '@remix-run/react'
import React from 'react'

interface RouteData {
  user: {
    id: string
    email: string
    name: string
    createdAt: string
  }
}

export function meta() {
  return {
    title: 'gmc.sh',
    description: 'Url shortener!',
  }
}

export default function Index() {
  const { user } = useRouteData<RouteData>()

  console.log(user)

  return (
    <div style={{ padding: 20 }}>
      <h2>gmc.sh!</h2>
      <p>
        Hello {user.name}{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </p>
    </div>
  )
}
