module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'import/order': [
      'error',
      {
        groups: [
          'object',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
