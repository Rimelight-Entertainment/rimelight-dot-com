import {
  z
} from 'zod'
import {
  eq
} from 'drizzle-orm'
import {
  useDb
} from '../../utils/drizzle'
import {
  articles, articleTags
} from '../../database/schema'
import {
  createError, defineEventHandler, readBody
} from 'h3'

const deleteArticleSchema = z.object({
  slug: z.string().min(1, `Slug is required.`)
})

export default defineEventHandler(async(event) => {
  const db = useDb()

  // Validate the incoming request body
  const result = deleteArticleSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: `Validation failed.`,
      data: result.error.issues
    })
  }

  const {
    slug
  } = result.data

  return db.transaction(async(tx) => {
    // Find the article by its slug to get the ID for deletion
    const article = await tx.query.articles.findFirst({
      where: eq(articles.slug, slug),
      columns: {
        id: true
      }
    })

    // If the article doesn't exist, throw a 404 error
    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: `Article with slug "${ slug }" not found.`
      })
    }

    // Delete relationships in the articleTags join table first
    await tx.delete(articleTags).where(eq(articleTags.articleId, article.id))

    // Now, delete the article itself
    await tx.delete(articles).where(eq(articles.id, article.id))

    return {
      success: true,
      message: `Article with slug "${ slug }" and all its tags have been successfully deleted.`
    }
  })
})
