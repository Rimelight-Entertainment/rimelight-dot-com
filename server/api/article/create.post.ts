import {
  v7 as uuidv7
} from 'uuid'
import {
  z
} from 'zod'
import {
  eq, inArray
} from 'drizzle-orm'
import {
  useDb
} from '../../utils/drizzle'
import {
  articles, articleTags, tags, articleTypeEnum
} from '../../database/schema'

type ArticleType = typeof articleTypeEnum.enumValues[number]

const createArticleSchema = z.object({
  title: z.string().min(1, `Title is required.`),
  slug: z.
    string().
    min(1, `Slug is required.`).
    regex(/^[a-z0-9-/]+$/, `Slug can only contain lowercase letters, numbers, and hyphens.`).
    transform((value) => value.trim().toLowerCase()),
  type: z.enum(articleTypeEnum.enumValues as [string, ...string[]]).default(`Default`),
  tags: z.string().array()
})

export default defineEventHandler(async(event) => {
  const db = useDb()

  /*
   * Validate the incoming request body
   * TODO Should this be readValidatedBody? (event, Schmea.safeParse)
   */
  const body = await readBody(event)
  const result = createArticleSchema.safeParse(body)

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: `Validation failed.`,
      data: result.error.issues
    })
  }

  /*
   * TODO Should we use this variant instead?
   * return sendError(event, createError({
   *  statusCode: 400,
   *  statusMessage: `Validation failed.`,
   *  data: result.error.issues
   * }))
   */

  const {
    title, slug, type, tags: tagNames
  } = result.data

  return db.transaction(async(tx) => {
    // 1. Check if the slug already exists to avoid duplicates
    const existingArticle = await tx.query.articles.findFirst({
      where: eq(articles.slug, slug)
    })

    if (existingArticle) {
      throw createError({
        statusCode: 409,
        statusMessage: `Slug already exists.`
      })
    }

    // 2. Create the new article
    const articleId = uuidv7()
    const [
      newArticle
    ] = await tx.
      insert(articles).
      values({
        id: articleId,
        title,
        slug,
        type: type as ArticleType,
        properties: {
        },
        blocks: [
        ]
      }).
      returning()

    // 3. Handle tags
    const tagIds = [
    ]
    if (tagNames && tagNames.length > 0) {
      // Find all existing tags from the provided list
      const existingTags = await tx.query.tags.findMany({
        where: inArray(tags.name, tagNames)
      })

      // Get the names of the tags that already exist
      const existingTagNames = new Set(existingTags.map((tag) => tag.name))

      // Determine which tags are new and need to be created
      const newTagNames = tagNames.filter((name) => !existingTagNames.has(name))

      // Insert all new tags in a single batch insert
      if (newTagNames.length > 0) {
        const newTags = await tx.
          insert(tags).
          values(newTagNames.map((name) => ({
            id: uuidv7(),
            name
          }))).
          returning()
        tagIds.push(...newTags.map((tag) => tag.id))
      }

      // Add the IDs of the existing tags to the list
      tagIds.push(...existingTags.map((tag) => tag.id))

      // 4. Create relationships in the join table
      const articleTagsValues = tagIds.map((tagId) => ({
        articleId: newArticle.id,
        tagId: tagId
      }))

      if (articleTagsValues.length > 0) {
        await tx.insert(articleTags).values(articleTagsValues)
      }
    }

    // Return the newly created article, including its tags
    const createdArticle = await tx.query.articles.findFirst({
      where: eq(articles.id, newArticle.id),
      with: {
        articleTags: {
          with: {
            tag: true
          }
        }
      }
    })

    return {
      success: true,
      article: {
        ...createdArticle,
        tags: createdArticle?.articleTags.map((at) => at.tag.name)
      }
    }
  })
})
