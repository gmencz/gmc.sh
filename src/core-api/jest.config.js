// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: path.join(__dirname, 'prisma', 'prisma-test-environment.js'),
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'ts-jest': {
      diagnostics: { warnOnly: true },
    },
  },
}
