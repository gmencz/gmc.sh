module.exports = {
  '*.+(js|ts|tsx)': ['npm run lint', 'jest --bail --findRelatedTests'],
  '*.+(js|json|ts|tsx)': ['npm run format'],
}
