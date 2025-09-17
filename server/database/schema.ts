import { pgEnum, pgTable, serial, uuid, varchar, text, timestamp, jsonb, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['user', 'employee'] as const);
export const articleTypeEnum = pgEnum('article_type', [
  'Default',
  'Location',
  'Language',
  'Species',
  'Character',
  'Group',
  'Object',
  'Item',
  'Skill',
  'Tale',
  'Hero',
  'Champion',
  'Card',
  'Series',
  'Episode',
]);

// Tables
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name', { length: 24 }),
  last_name: varchar('last_name', { length: 24 }),
  email: varchar('email', { length: 255 }).notNull().unique('users_email_unique'),
  password_hash: text('password_hash').notNull(),
  username: varchar('username', { length: 24 }).notNull().unique('users_username_unique'),
  role: userRoleEnum('role').notNull().default('user'),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().notNull(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  type: articleTypeEnum('type').default('Default').notNull(),
  properties: jsonb('properties'),
  blocks: jsonb('blocks'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

export const articleTags = pgTable('article_tags', {
  articleId: uuid('article_id')
    .notNull()
    .references(() => articles.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: primaryKey({ columns: [t.articleId, t.tagId] }),
}));

// Relations
export const articleRelations = relations(articles, ({ many }) => ({
  articleTags: many(articleTags),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  articleTags: many(articleTags),
}));

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
  tag: one(tags, {
    fields: [articleTags.tagId],
    references: [tags.id],
  }),
}));

// Schema export
export const schema = {
  users,
  articles,
  tags,
  articleTags,
  articleRelations,
  tagRelations,
  articleTagsRelations,
};