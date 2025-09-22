import {
  useDb
} from '../../utils/drizzle'
import {
  tags
} from '../../database/schema'

export default defineEventHandler(async() => {
  const db = useDb()

  const allTags = await db.query.tags.findMany({
    orderBy: tags.name
  })

  return {
    success: true,
    tags: allTags
  }
})
