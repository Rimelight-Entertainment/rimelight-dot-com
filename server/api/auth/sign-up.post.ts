import { z } from 'zod'
import { db, tables } from '~~/server/utils/db'

export const signUpSchema = z
  .object({
    firstName: z.string().min(2).max(24).optional(),
    lastName: z.string().min(2).max(24).optional(),
    username: z.string().min(2).max(24),
    email: z.string().email(),
    password: z.string().min(8).max(24),
  })
// No need for a refine here – the client already stripped the confirmation

export default defineEventHandler(async (event) => {
  // Throws 400 if validation fails
  const body = await readValidatedBody(event, signUpSchema.parse)

  const hashedPassword = await hashPassword(body.password)

  const [user] = await db
    .insert(tables.users)
    .values({
      email: body.email,
      username: body.username,
      passwordHash: hashedPassword,
      firstName: body.firstName ?? null,
      lastName: body.lastName ?? null,
    })
    .returning()

  if (!user) {
    throw new Error('Failed to retrieve newly created user');
  }

  await setUserSession(event, {
    user: { id: user.id, username: user.username },
    lastLoggedIn: new Date(),
  });

  return { success: true }
})