import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: `postgresql`,
  schema: `./server/database/schema.ts`,
  out: `server/database/drizzle`,
  dbCredentials: {
    url: process.env.NUXT_POSTGRES_URL || ``
  }
})
