import {
  z
} from 'zod'
import type {
  H3Event
} from 'h3'
import {
  defineEventHandler, createError
} from 'h3'
import {
  useDb
} from '~~/server/utils/drizzle'
import {
  users
} from '~~/server/database/schema'

const signUpSchema = z.object({
  first_name: z.string().min(2).
    max(24),
  last_name: z.string().min(2).
    max(24),
  username: z.string().min(2).
    max(24),
  email: z.string().email(),
  password: z.string().min(8).
    max(24),
  password_confirmation: z.string().min(8).
    max(24)
}).refine((d) => d.password === d.password_confirmation, {
  message: `Passwords do not match`,
  path: [
    `password_confirmation`
  ]
})

async function getRequestBody(event: H3Event) {
  const body = await readBody(event)
  return signUpSchema.parse(body)
}

export default defineEventHandler(async(event) => {
  try {
    const body = await getRequestBody(event)
    const hashedPassword = await hashPassword(body.password)

    const db = useDb()

    const userRole = body.email.endsWith(`@rimelight.com`) ? `employee` : `user`

    const [
      user
    ] = await db.
      insert(users).
      values({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        username: body.username,
        password_hash: hashedPassword,
        role: userRole
      }).
      returning()

    if (!user) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to create user`
      })
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      lastLoggedIn: new Date()
    })

    return {
      success: true
    }
  } catch(error: any) {
    if (error.code === `23505`) {
      if (error.constraint === `users_email_unique`) {
        throw createError({
          statusCode: 409,
          statusMessage: `Email already in use`
        })
      }
      if (error.constraint === `users_username_unique`) {
        throw createError({
          statusCode: 409,
          statusMessage: `Username already taken`
        })
      }
      throw createError({
        statusCode: 409,
        statusMessage: `Duplicate value`
      })
    }

    // If it's a Zod error, return validation error
    if (error.errors) {
      throw createError({
        statusCode: 400,
        statusMessage: `Validation failed`,
        data: error.errors
      })
    }

    console.error(`Sign‑up error:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `An unexpected error occurred`
    })
  }
})
