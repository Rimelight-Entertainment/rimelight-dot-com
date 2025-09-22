import { defineConfig } from 'drizzle-kit'
import env from './types/env'

export default defineConfig({
  dialect: `postgresql`,
  schema: `./server/database/schema/index.ts`,
  casing: `snake_case`,
  out: `server/database/drizzle`,
  dbCredentials: {
    url: env.NODE_ENV === `development` ? env.NUXT_POSTGRES_DEVELOPMENT_URL : env.NUXT_POSTGRES_URL
  }
})
