import { config as configureEnv } from 'dotenv'
configureEnv()

import fastify from 'fastify'
import { v1Routes } from 'routes/v1'
import admin from 'firebase-admin'
import firebase from 'firebase'

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

const server = fastify({ logger: true })

server.register(v1Routes, { prefix: '/v1' })

server.listen(Number(process.env.PORT), (err, address) => {
  if (err) {
    server.log.error(err.message)
    process.exit(1)
  }

  server.log.info(`Core API listening at ${address}`)
})

process.on('unhandledRejection', err => {
  server.log.error(`An unhandled promise rejection ocurred.`)
  throw err
})
