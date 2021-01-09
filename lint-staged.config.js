module.exports = {
  '*.{js,ts,tsx,graphql,json,yaml}': ['npm run format --'],
  '*.{ts,tsx}': [
    'npm run gen-gql-types',
    () => 'npm run check-types',
    'npm run test -- --bail --findRelatedTests',
    'npm run lint --',
  ],
}
