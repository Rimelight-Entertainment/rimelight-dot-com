import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './server/database/d1/schema.ts',
  out: './server/database/d1/migrations',
  dbCredentials: {
    url: process.env.NUXT_POSTGRES_URL || '',
  },
})