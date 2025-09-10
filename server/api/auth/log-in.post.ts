import { z } from 'zod'
import { db, tables } from '~~/server/utils/db'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, loginSchema.parse)

  const user = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, body.email))
    .limit(1)
    .then((rows) => rows[0])

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const ok = await verifyPassword(user.passwordHash, body.password)
  if (!ok) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  await setUserSession(event, {
    user: { id: user.id, username: user.username },
    lastLoggedIn: new Date(),
  })

  return { success: true }
})