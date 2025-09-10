import { pgTable, serial, varchar, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  username: varchar('username', { length: 24 }).notNull().unique(),
  firstName: varchar('first_name', { length: 24 }),
  lastName: varchar('last_name', { length: 24 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const schema = { users }