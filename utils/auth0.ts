import { initAuth0 } from '@auth0/nextjs-auth0'
import IAuth0Settings from '@auth0/nextjs-auth0/dist/settings'

type VercelNodeEnv = 'production' | 'preview' | 'development'
function getAuth0BaseConfig(): IAuth0Settings {
  if (typeof window === 'undefined') {
    const url = (production: string, branch: string, local: string) => {
      switch (process.env.NODE_ENV as VercelNodeEnv) {
        case 'production':
          return production
        case 'preview':
          return branch
        case 'development':
          return local
        default:
          return local
      }
    }

    const base = url(
      'https://app.gmc.sh',
      `https://${process.env.VERCEL_URL}`,
      'http://localhost:3000',
    )

    return {
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
      scope: 'openid profile',
      redirectUri: `${base}/api/callback`,
      postLogoutRedirectUri: `${base}/auth`,
    }
  }

  return {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
    scope: 'openid profile',
    redirectUri: `${window.location.origin}/api/callback`,
    postLogoutRedirectUri: `${window.location.origin}/auth`,
  }
}

export default initAuth0({
  ...getAuth0BaseConfig(),
  audience: process.env.AUTH0_AUDIENCE as string,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET as string,
    cookieLifetime: 60 * 60 * 8,
    cookieDomain: '',
    cookieSameSite: 'lax',
    storeAccessToken: true,
  },
})
