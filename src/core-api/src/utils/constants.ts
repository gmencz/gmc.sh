export const FRONTEND_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://app.gmc.sh'
    : 'http://localhost:3000'