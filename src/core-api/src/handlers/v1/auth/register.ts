import { Static, Type } from '@sinclair/typebox'
import { RouteHandler } from 'fastify'
import { nanoid as uniqueId } from 'nanoid'
import { hash } from 'argon2'
import { User } from '@prisma/client'
import admin from 'firebase-admin'
import firebase from 'firebase'
import { handleValidationError } from 'utils/handle-validation-error'
import { db } from 'utils/db'

const registerBody = Type.Object({
  username: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ minLength: 1, maxLength: 255, format: 'email' }),
  password: Type.String({
    minLength: 6,
    maxLength: 255,
  }),
})

const register: RouteHandler<{ Body: Static<typeof registerBody> }> = async (
  request,
  reply,
) => {
  try {
    // Validate request body
    if (request.validationError) {
      const errors = handleValidationError(request.validationError.validation)
      return reply.status(422).send({
        message: 'Validation failed',
        errors,
      })
    }

    const { email, username, password } = request.body
    const hashedPassword = await hash(password)
    let user: Omit<User, 'password'>

    try {
      user = await db.user.create({
        data: {
          id: `u-${uniqueId()}`,
          email,
          password: hashedPassword,
          username,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
        },
      })
    } catch (error) {
      reply.log.error(error)
      return reply.status(500).send({
        message: 'Server error',
        info: {
          ...error,
        },
      })
    }

    let token = ''

    try {
      token = await admin.auth().createCustomToken(user.id)
    } catch (e) {
      const error = e as admin.FirebaseError
      return reply.status(500).send({
        message: error.message,
        info: {
          ...error,
        },
      })
    }

    try {
      await firebase.auth().signInWithCustomToken(token)
    } catch (e) {
      const error = e as admin.FirebaseError
      return reply.status(500).send({
        message: error.message,
        info: {
          ...error,
        },
      })
    }

    return reply.send({
      token,
      user: {
        ...user,
      },
    })
  } catch (error) {
    reply.log.error(error)
    if (error instanceof Error) {
      return reply.status(500).send({
        message: 'Server error',
        info: {
          ...error,
        },
      })
    } else {
      return reply.status(500).send({
        message: 'Server error',
        info: {},
      })
    }
  }
}

export { register, registerBody }
