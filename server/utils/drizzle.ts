import { drizzle as drizzleNeonHttp } from 'drizzle-orm/neon-http'
import { neon, neonConfig } from '@neondatabase/serverless'
import * as neonSchema from '../database/schema'
import { pgTable, serial, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { sql, eq, and, or } from 'drizzle-orm'

export { sql, eq, and, or, pgTable, serial, varchar, text, timestamp, pgEnum }
export * from '../database/schema'

neonConfig.fetchConnectionCache = true

/**
 * Creates and returns a Drizzle ORM instance for the Neon database.
 * This is used for managing user data and other critical application data.
 * @returns The Drizzle Neon DB instance.
 */
export function useDb() {
  const url = process.env.NUXT_POSTGRES_URL
  if (!url) {
    throw new Error('Missing `NUXT_POSTGRES_URL` environment variable.')
  }

  const sql = neon(url)
  const db = drizzleNeonHttp(sql, { schema: neonSchema })

  return db
}