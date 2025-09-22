import {
  defineEventHandler
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

export default defineEventHandler(async(event) => {
  const session = await getUserSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: `Unauthenticated`
    })
  }

  const db = useDb()

  const result = await db.
    select({
      id: users.id,
      email: users.email,
      username: users.username,
      first_name: users.first_name,
      last_name: users.last_name,
      role: users.role,
      createdAt: users.created_at
    }).
    from(users).
    where(eq(users.id, session.user.id)).
    limit(1).
    then((rows) => rows[0])

  if (!result) {
    throw createError({
      statusCode: 404,
      statusMessage: `User not found`
    })
  }

  return result
})
