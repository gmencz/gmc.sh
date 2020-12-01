/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { config } = require('dotenv')
config({ path: path.join(__dirname, '.env.test') })

const NodeEnvironment = require('jest-environment-node')

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config)

    this.dbURL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:6544/${process.env.POSTGRES_DB}?schema=public`
    process.env.DATABASE_URL = this.dbURL
    this.global.process.env.DATABASE_URL = this.dbURL
  }

  async setup() {
    return super.setup()
  }
}

module.exports = PrismaTestEnvironment
