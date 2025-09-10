import { sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', (t) => ({
  id: t.integer('id').primaryKey({ autoIncrement : true }),
  email: t.text().notNull().unique(),
  passwordHash: t.text().notNull(),
  username: t.text().notNull(),
  firstName: t.text(),
  lastName: t.text(),
  createdAt: t.integer({mode: 'timestamp_ms'}).$defaultFn(() => new Date()).notNull(),
  updatedAt: t.integer({mode: 'timestamp_ms'}).$defaultFn(() => new Date()).$onUpdate(() => new Date()).notNull()
}));