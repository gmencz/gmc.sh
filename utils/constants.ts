const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://api.gmc.sh'
    : 'http://localhost:4500'

export { API_ENDPOINT }
