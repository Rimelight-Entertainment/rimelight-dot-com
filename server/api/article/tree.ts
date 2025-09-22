import {
  useDb
} from '../../utils/drizzle'
import type {
  articles
} from '../../database/schema'

const normalizePathPart = (str: string): string => {
  return str.
    split(`-`).
    map((word) => word.charAt(0).toUpperCase() + word.slice(1)).
    join(` `)
}

// Utility function to build a hierarchical tree from a flat list of articles
const buildArticleTree = (articlesList: typeof articles.$inferSelect[]) => {
  const tree: any[] = [
  ]
  const nodes = new Map<string, any>()

  for (const article of articlesList) {
    if (!article.slug)
      continue

    const sanitizedSlug = article.slug.replace(/^\/|\/$/g, ``)
    const parts = sanitizedSlug.split(`/`)
    let currentLevel = tree
    let currentPath = ``

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const key = (currentPath ? `${ currentPath }/` : ``) + part
      const isLastPart = i === parts.length - 1

      let node = nodes.get(key)

      if (!node) {
        node = {
          label: isLastPart ? article.title : normalizePathPart(part),
          value: key,
          icon: isLastPart ? `i-lucide-file-text` : undefined,
          children: isLastPart ? undefined : [
          ],
          slug: isLastPart ? `/${ article.slug }` : undefined
        }
        currentLevel.push(node)
        nodes.set(key, node)
      }

      if (!isLastPart && node.children) {
        currentLevel = node.children
      }
      currentPath = key
    }
  }

  return tree
}

export default defineEventHandler(async() => {
  const db = useDb()

  try {
    const articlesList = await db.query.articles.findMany({
      columns: {
        slug: true,
        title: true
      }
    })

    return buildArticleTree(articlesList)
  } catch(error) {
    console.error(`Error fetching article tree:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Internal Server Error`
    })
  }
})
