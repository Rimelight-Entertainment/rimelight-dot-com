import {
  pgTable, varchar, uuid
} from "drizzle-orm/pg-core"
import {
  relations
} from "drizzle-orm"
import {
  articleTags
} from "./index"

export const tags = pgTable(`tags`, {
  id: uuid(`id`).primaryKey().
    notNull(),
  name: varchar(`name`, {
    length: 50
  }).notNull().
    unique()
})

export const tagRelations = relations(tags, ({
  many
}) => ({
  articleTags: many(articleTags)
}))
