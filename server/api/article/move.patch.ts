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
  articles
} from '../../database/schema'

const moveArticleSchema = z.object({
  initialSlug: z.string().min(1, `Initial slug is required.`),
  newSlug: z.
    string().
    min(1, `New slug is required.`).
    regex(/^[a-z0-9-/]+$/, `New slug can only contain lowercase letters, numbers, and hyphens.`).
    transform((value) => value.trim().toLowerCase())
})

export default defineEventHandler(async(event) => {
  const db = useDb()

  const body = await readBody(event)
  const result = moveArticleSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: `Validation failed.`,
      data: result.error.issues
    })
  }

  const {
    initialSlug, newSlug
  } = result.data

  // Use a transaction to ensure the operations are atomic
  return db.transaction(async(tx) => {
    // 1. Check if the initial slug exists
    const existingArticle = await tx.query.articles.findFirst({
      where: eq(articles.slug, initialSlug)
    })

    if (!existingArticle) {
      throw createError({
        statusCode: 404,
        statusMessage: `Article not found.`
      })
    }

    // 2. Check if the new slug is already in use by another article
    if (initialSlug !== newSlug) {
      const newSlugExists = await tx.query.articles.findFirst({
        where: eq(articles.slug, newSlug)
      })

      if (newSlugExists) {
        throw createError({
          statusCode: 409,
          statusMessage: `New slug already exists.`
        })
      }
    }

    // 3. Update the article's slug
    const [
      updatedArticle
    ] = await tx.
      update(articles).
      set({
        slug: newSlug
      }).
      where(eq(articles.id, existingArticle.id)).
      returning()

    if (!updatedArticle) {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to update article.`
      })
    }

    return {
      success: true,
      article: updatedArticle
    }
  })
})
