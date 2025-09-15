import { drizzle as drizzleNeon, type NeonClient } from 'drizzle-orm/neon-serverless'
import { drizzle as drizzleD1 } from 'drizzle-orm/d1'
import { neon } from '@neondatabase/serverless'

import * as neonSchema from '../database/neon/schema'
import * as d1Schema from '../database/d1/schema'

export { sql, eq, and, or } from 'drizzle-orm'
export const neonTables = neonSchema
export const d1Tables = d1Schema

/**
 * Creates and returns a Drizzle ORM instance for the Neon database.
 * This is used for managing user data and other critical application data.
 * @returns An object containing the Drizzle Neon DB instance and the raw Postgres client.
 */
function useNeonDb() {
  const url = process.env.NUXT_POSTGRES_URL
  if (!url) {
    throw new Error('Missing `NUXT_POSTGRES_URL` environment variable.')
  }

  const client = neon(url) as unknown as NeonClient
  const db = drizzleNeon(client, { schema: neonSchema })

  return { db }
}

/**
 * Creates and returns a Drizzle ORM instance for the Cloudflare D1 database.
 * This is intended for less critical data like page feedback.
 * @returns The Drizzle D1 DB instance.
 */
function useD1Db() {
  return drizzleD1(hubDatabase(), { schema: d1Schema })
}

/**
 * Unified utility function that provides access to both database connections.
 * Call this function to get a single object with access to both Drizzle instances.
 * @returns An object with `neonDb` and `d1Db` properties.
 */
export function useDb() {
  return {
    neonDb: useNeonDb().db,
    d1Db: useD1Db(),
  }
}