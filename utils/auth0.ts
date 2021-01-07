import { initAuth0 } from '@auth0/nextjs-auth0'
import IAuth0Settings from '@auth0/nextjs-auth0/dist/settings'

function getAuth0BaseConfig(): IAuth0Settings {
  const url = (productionUrl: string, localUrl: string) => {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    }

    switch (process.env.NODE_ENV) {
      case 'production':
        return productionUrl
      case 'development':
        return localUrl
      default:
        return localUrl
    }
  }

  const base = url('https://app.gmc.sh', 'http://localhost:3000')

  return {
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
    clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
    scope: 'openid profile',
    redirectUri: `${base}/api/callback`,
    postLogoutRedirectUri: base,
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
