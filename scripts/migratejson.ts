import { useDb } from '../server/utils/drizzle'
import { articles } from '../server/database/schema'
import { glob } from 'glob'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { v7 as uuidv7 } from 'uuid'
import 'dotenv/config'

interface PageData {
  id: string
  slug: string
  type: string
  title: string
  tags: string[]
  properties: object
  blocks: {
    id: string
    type: string
    attrs: object
    isTemplated?: boolean
  }[]
  lastModified: string
  categories: string[]
}

const isArticleType = (type: string): type is typeof articles.type.enumValues[number] => {
  return (articles.type.enumValues as string[]).includes(type)
}

async function migratePagesToDb() {
  const db = useDb()
  try {
    const pagesDirectory = join(process.cwd(), `app/data/pages`)
    const jsonFiles = await glob(`**/*.json`, { cwd: pagesDirectory })

    if (jsonFiles.length === 0) {
      console.log(`No JSON files found in the pages directory.`)
      return
    }

    console.log(`Found ${jsonFiles.length} JSON files. Starting migration...`)

    for (const file of jsonFiles) {
      const filePath = join(pagesDirectory, file)
      try {
        const fileContent = await readFile(filePath, `utf-8`)
        const pageData: PageData = JSON.parse(fileContent)

        if (!isArticleType(pageData.type)) {
          console.error(`Invalid article type "${pageData.type}" found in file: ${file}. Skipping.`)
          continue
        }

        // Generate a new UUIDv7 for the article ID
        const newArticleId = uuidv7()

        // Generate new UUIDv7 for each block ID
        const newBlocks = pageData.blocks.map((block) => ({
          ...block,
          id: uuidv7()
        }))

        const transformedData: typeof articles.$inferInsert = {
          id: newArticleId,
          slug: pageData.slug,
          title: pageData.title,
          type: pageData.type,
          tags: pageData.tags,
          properties: pageData.properties,
          blocks: newBlocks
        }

        await db.insert(articles).values(transformedData).onConflictDoNothing()

        console.log(`Successfully migrated article: ${pageData.title}`)
      } catch (error) {
        console.error(`Error processing file ${file}:`, error)
      }
    }
    console.log(`Migration process completed.`)
  } catch (err) {
    console.error(`An unexpected error occurred during migration:`, err)
  } finally {
    process.exit(0)
  }
}

migratePagesToDb()
