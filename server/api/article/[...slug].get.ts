import {
  eq
} from 'drizzle-orm'
import {
  useDb
} from '../../utils/drizzle'
import {
  articles
} from '../../database/schema'

export default defineEventHandler(async(event) => {
  const db = useDb()

  const slug = event.context.params?.slug

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: `Slug is missing.`
    })
  }

  try {
    const article = await db.query.articles.findFirst({
      where: eq(articles.slug, slug),
      with: {
        articleTags: {
          with: {
            tag: true
          }
        }
      }
    })

    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: `Article not found.`
      })
    }

    return {
      ...article,
      tags: article.articleTags.map((at) => at.tag.name)
    }
  } catch(error) {
    // You can add more specific error handling here
    console.error(`Error fetching article:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error`
    })
  }
})
