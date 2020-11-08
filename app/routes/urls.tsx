import { useRouteData } from '@remix-run/react'
import React from 'react'
import { useAuthenticatedRouteData } from '../hooks/useAuthenticatedRouteData'

export function meta() {
  return {
    title: "Your URL's - gmc.sh",
    description:
      "Here you can find your shortened URL's and everything about them.",
  }
}

export default function Urls() {
  const { user } = useAuthenticatedRouteData()
  const urls = useRouteData()

  if (!user) {
    return null
  }

  console.log(urls)

  return <h1>Your URL's page</h1>
}
