module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./utils/generate-sitemap')
    }

    return config
  },
  images: {
    domains: ['cdn.gmc.sh'],
  },
}
