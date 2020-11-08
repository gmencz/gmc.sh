import { Link } from '@remix-run/react'
import React from 'react'
import { useAuthenticatedRouteData } from '../hooks/useAuthenticatedRouteData'

export function meta() {
  return {
    title: 'gmc.sh',
    description: 'URL Shortener!',
  }
}

export default function Index() {
  const { user } = useAuthenticatedRouteData()

  if (!user) {
    return null
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>
        Hello, {user?.name}{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h2>
      <Link to="/urls">Your shortened URL's</Link>
    </div>
  )
}
