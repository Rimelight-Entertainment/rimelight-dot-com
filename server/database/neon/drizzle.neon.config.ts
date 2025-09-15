import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './server/database/neon/schema.ts',
  out: './server/database/neon/migrations',
  dbCredentials: {
    url: process.env.NUXT_POSTGRES_URL || '',
  },
})