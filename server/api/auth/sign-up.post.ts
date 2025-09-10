import { z } from 'zod'
import { defineEventHandler, readValidatedBody, createError } from 'h3'
import { useDb } from '~~/server/utils/db'
import { users } from '~~/server/database/schema'

export const signUpSchema = z.object({
  firstName: z.string().min(2).max(24).optional(),
  lastName: z.string().min(2).max(24).optional(),
  username: z.string().min(2).max(24),
  email: z.string().email(),
  password: z.string().min(8).max(24),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, signUpSchema.parse)

  const hashedPassword = await hashPassword(body.password)

  const { db } = useDb()

  const [user] = await db
    .insert(users)
    .values({
      email: body.email,
      username: body.username,
      passwordHash: hashedPassword,
      firstName: body.firstName ?? null,
      lastName: body.lastName ?? null,
    })
    .returning() // returns the inserted row(s)

  if (!user) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create user' })
  }

  await setUserSession(event, {
    user: { id: user.id, username: user.username },
    lastLoggedIn: new Date(),
  })

  return { success: true }
})