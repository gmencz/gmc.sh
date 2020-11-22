/* eslint-disable @typescript-eslint/no-var-requires */
const tsconfig = require('./tsconfig.json')
// eslint-disable-next-line import/order
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)

/* 
  The moduleNameMapper exported by "tsconfig-paths-jest" doesn't match
  only the paths which are exact, for example, if in our tsconfig.json paths we have:
  "utils/*": [...]
  then the moduleNameMapper from jest would apply to everything with utils/*, including
  relative paths such as "../../utils/something" and this can cause issues, so in order
  to fix this, we transform each mapper to start with ^ so it doesn't match relative
  paths and only exact ones.
*/
const exactModuleNameMapper = {}
Object.keys(moduleNameMapper).forEach(glob => {
  exactModuleNameMapper[`^${glob}`] = moduleNameMapper[glob]
})

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
  },
  // Load tsconfig paths and transform them into moduleNameMapper
  moduleNameMapper: exactModuleNameMapper,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
