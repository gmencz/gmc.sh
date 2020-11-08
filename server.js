const express = require('express')
const morgan = require('morgan')
const { createRequestHandler } = require('@remix-run/express')
const cookieParser = require('cookie-parser')
const { compare, hash } = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const { nanoid: createId } = require('nanoid')
const { json } = require('express')

let app = express()
const db = new PrismaClient({
  log: ['query', 'info', 'error', 'warn'],
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(json())
app.use(cookieParser())
app.use(express.static('public'))

app.post('/api/signup', async (req, res) => {
  const { email, name, password } = req.body || {}

  if (!email) {
    return res.status(400).json({
      message: 'Email is required',
    })
  }

  if (!name) {
    return res.status(400).json({
      message: 'Name is required',
    })
  }

  if (!password) {
    return res.status(400).json({
      message: 'Password is required',
    })
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      password: await hash(password, 12),
    },
  })

  const { id, email: userEmail, name: userName, createdAt } = user
  req.user = {
    id,
    email: userEmail,
    name: userName,
    createdAt,
  }

  const session = await db.session.create({
    data: {
      User: {
        connect: {
          id,
        },
      },
      sessionId: createId(20),
    },
  })

  res.cookie('__session', session.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 5184000000,
  })
  return res.redirect('/')
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {}

  if (!email) {
    return res.status(400).json({
      message: 'Email is required',
    })
  }

  if (!password) {
    return res.status(400).json({
      message: 'Password is required',
    })
  }

  const user = await db.user.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }

  const validPassword = await compare(password, user.password)

  if (!validPassword) {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }

  const { id, email: userEmail, name, createdAt } = user
  req.user = {
    id,
    email: userEmail,
    name,
    createdAt,
  }

  const session = await db.session.create({
    data: {
      User: {
        connect: {
          id,
        },
      },
      sessionId: createId(20),
    },
  })

  res.cookie('__session', session.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 5184000000,
  })
  return res.redirect('/')
})

app.get(
  '*',
  createRequestHandler({
    getLoadContext(req, res) {
      // Whatever you return here will be passed as `context` to your loaders.
      return { req, res, db }
    },
  }),
)

app.listen(3000, () => {
  console.log('Express server started on http://localhost:3000')
})
