import {
  z
} from 'zod'
import {
  defineEventHandler, readValidatedBody, createError
} from 'h3'
import {
  eq
} from 'drizzle-orm'
import {
  useDb
} from '~~/server/utils/drizzle'
import {
  users
} from '~~/server/database/schema'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default defineEventHandler(async(event) => {
  const body = await readValidatedBody(event, loginSchema.parse)

  const db = useDb()

  const user = await db.
    select().
    from(users).
    where(eq(users.email, body.email)).
    limit(1).
    then((rows) => rows[0])

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`
    })
  }

  const ok = await verifyPassword(user.password_hash, body.password)
  if (!ok) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthorized`
    })
  }

  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role
    },
    lastLoggedIn: new Date()
  })

  return {
    success: true
  }
})
