import {
  jsonb, pgEnum, pgTable, text, timestamp, uuid
} from "drizzle-orm/pg-core"
import {
  relations
} from "drizzle-orm"
import {
  articleTags
} from "./index"

export const articleTypeEnum = pgEnum(`article_type`, [
  `Default`,
  `Location`,
  `Language`,
  `Species`,
  `Character`,
  `Group`,
  `Object`,
  `Item`,
  `Skill`,
  `Tale`,
  `Hero`,
  `Champion`,
  `Card`,
  `Series`,
  `Episode`
])

export const articles = pgTable(`articles`, {
  id: uuid(`id`).primaryKey().
    notNull(),
  slug: text(`slug`).unique().
    notNull(),
  title: text(`title`).notNull(),
  type: articleTypeEnum(`type`).default(`Default`).
    notNull(),
  properties: jsonb(`properties`),
  blocks: jsonb(`blocks`),
  createdAt: timestamp(`created_at`).defaultNow().
    notNull(),
  updatedAt: timestamp(`updated_at`).defaultNow().
    notNull()
})

export const articleRelations = relations(articles, ({
  many
}) => ({
  articleTags: many(articleTags)
}))
