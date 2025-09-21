import { drizzle as drizzleNeonServerless } from 'drizzle-orm/neon-serverless'
import { Pool, neonConfig } from '@neondatabase/serverless'
import * as neonSchema from '../database/schema'

neonConfig.fetchConnectionCache = true

let pool: Pool
let db: ReturnType<typeof drizzleNeonServerless<typeof neonSchema>>

/**
 * Creates and returns a Drizzle ORM instance for the Neon database using a connection pool.
 * @returns The Drizzle Neon DB instance.
 */
export function useDb() {
  if (!db) {
    const url = process.env.NUXT_POSTGRES_URL
    if (!url) {
      throw new Error(`Missing \`NUXT_POSTGRES_URL\` environment variable.`)
    }

    pool = new Pool({ connectionString: url })
    // Pass the schema object to the drizzle function.
    db = drizzleNeonServerless(pool, { schema: neonSchema })
  }

  return db
}
