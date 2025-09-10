import { defineEventHandler } from 'h3'
import { useDb } from '~~/server/utils/db'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthenticated' })
  }

  const { raw: sql } = useDb()
  const users = await sql`SELECT id, email, username, first_name, last_name, created_at FROM users`

  return users
})