
import { pgEnum, pgTable, serial, uuid, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['user', 'employee'] as const);

export const articleTypeEnum = pgEnum('article_type', [
  'Default',
  'Species',
  'Character',
  'Group',
  'Item',
  'Skill',
  'Tale',
  'Hero',
  'Champion',
  'Card',
  'Series',
  'Episode'
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name', { length: 24 }),
  last_name: varchar('last_name', { length: 24 }),
  email: varchar('email', { length: 255 }).notNull().unique('users_email_unique'),
  password_hash: text('password_hash').notNull(),
  username: varchar('username', { length: 24 }).notNull().unique('users_username_unique'),
  role: userRoleEnum('role').notNull().default('user'),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

export const articles = pgTable('articles', {
  id: uuid('id').primaryKey().notNull(),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  type: articleTypeEnum('type').default('Default').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]),
  properties: jsonb('properties'),
  blocks: jsonb('blocks'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const schema = { users, articles }