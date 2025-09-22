import { drizzle as drizzleNeonServerless } from "drizzle-orm/neon-serverless"
import { Pool, neonConfig } from "@neondatabase/serverless"
import * as Schema from "../database/schema"
import env from "../../types/env"

let pool: Pool
let db: ReturnType<typeof drizzleNeonServerless<typeof Schema>>

/**
 * Creates and returns a Drizzle ORM instance for the Neon database using a connection pool.
 * @returns The Drizzle Neon DB instance.
 */
export function useDb() {
  if (!db) {
    const url = env.NODE_ENV === `development` ? env.NUXT_POSTGRES_DEVELOPMENT_URL : env.NUXT_POSTGRES_URL
    if (!url) {
      throw new Error(`Missing \`NUXT_POSTGRES_URL\` environment variable.`)
    }

    pool = new Pool({ connectionString: url })
    // Pass the schema object to the drizzle function.
    db = drizzleNeonServerless(pool, { schema: Schema, casing: `snake_case` })
  }

  return db
}
