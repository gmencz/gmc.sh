import { config as configureEnv } from 'dotenv'
configureEnv()

import fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import { v1Routes } from 'routes/v1'
import admin from 'firebase-admin'
import firebase from 'firebase'

type BuildOptions = {
  disableLogger?: boolean
}

function build(options: BuildOptions = {}): FastifyInstance {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_AUTH_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  })

  admin.initializeApp()

  const server = fastify(
    options.disableLogger ? {} : { logger: { prettyPrint: true } },
  )

  // Decorators
  server.decorateRequest('user', null)

  // Plugins
  server.register(fastifyCookie)

  // Routes
  server.register(v1Routes, { prefix: '/v1' })

  return server
}

export { build }
