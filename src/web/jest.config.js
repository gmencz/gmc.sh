/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

module.exports = {
  setupFiles: [require.resolve('whatwg-fetch')],
  setupFilesAfterEnv: ['<rootDir>/test/setup-env.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  moduleNameMapper: {
    '^components(.*)$': resolve(__dirname, './components/$1'),
    '^hooks(.*)$': resolve(__dirname, './hooks/$1'),
    '^api(.*)$': resolve(__dirname, './utils/api/$1'),
    '^utils(.*)$': resolve(__dirname, './utils/$1'),
    '^test(.*)$': resolve(__dirname, './test/$1'),
    '^@gmcsh(.*)$': resolve(__dirname, '../$1/src'),
  },
}
