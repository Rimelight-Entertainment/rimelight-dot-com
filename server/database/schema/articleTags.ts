import {
  primaryKey, pgTable, uuid
} from "drizzle-orm/pg-core"
import {
  relations
} from "drizzle-orm"
import {
  articles, tags
} from "./index"

export const articleTags = pgTable(`article_tags`, {
  articleId: uuid(`article_id`).
    notNull().
    references(() => articles.id, {
      onDelete: `cascade`
    }),
  tagId: uuid(`tag_id`).
    notNull().
    references(() => tags.id, {
      onDelete: `cascade`
    })
}, (t) => ({
  pk: primaryKey({
    columns: [
      t.articleId,
      t.tagId
    ]
  })
}))

export const articleTagsRelations = relations(articleTags, ({
  one
}) => ({
  article: one(articles, {
    fields: [
      articleTags.articleId
    ],
    references: [
      articles.id
    ]
  }),
  tag: one(tags, {
    fields: [
      articleTags.tagId
    ],
    references: [
      tags.id
    ]
  })
}))
