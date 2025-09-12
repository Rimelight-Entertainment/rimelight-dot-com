
import { pgEnum, pgTable, serial, varchar, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core'

export const userRoleEnum = pgEnum('user_role', ['user', 'employee'] as const);
export type UserRole = typeof userRoleEnum.enumValues[number];

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

export const schema = { users }