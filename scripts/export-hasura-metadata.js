/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: '.env.hasura' })
const http = require('http')
const { execSync } = require('child_process')

const hasuraAdminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

async function exportMetadata() {
  let hasuraStatusCode = 200
  try {
    hasuraStatusCode = await new Promise((resolve, reject) => {
      http
        .get('http://localhost:8080/healthz', response => {
          resolve(response.statusCode)
        })
        .on('error', reject)
    })
  } catch (error) {
    hasuraStatusCode = 500
  }

  if (hasuraStatusCode !== 200) {
    console.error(
      'Hasura instance not running, run docker-compose up -d to run it.',
    )
    process.exit(1)
  }

  try {
    const output = execSync(
      `cd hasura && npx hasura metadata export --admin-secret ${hasuraAdminSecret}`,
    )
    console.info(output.toString())
  } catch (error) {
    console.error(error)
  }
}

exportMetadata()
