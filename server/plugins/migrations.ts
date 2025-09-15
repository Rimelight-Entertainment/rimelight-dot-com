import { consola } from 'consola'
import { migrate as migrateNeon } from 'drizzle-orm/neon-serverless/migrator'
import { migrate as migrateD1 } from 'drizzle-orm/d1/migrator'
import { useDb } from '~~/server/utils/drizzle'

export default defineNitroPlugin(() => {
  if (!import.meta.dev) return

  onHubReady(async () => {
    const { neonDb, d1Db } = useDb()

    // Neon (PostgreSQL) Migrations
    try {
      consola.info('Attempting to run Neon DB migrations...')
      await migrateNeon(neonDb, {
        migrationsFolder: 'server/database/neon/migrations',
      })
      consola.success('✅ Neon DB migrations completed successfully.')
    } catch (err) {
      consola.error('❌ Neon DB migrations failed:', err)
      // Throwing the error here will stop the server startup,
      // which is a good practice for critical migrations.
      throw err
    }

    // Cloudflare D1 (SQLite) Migrations
    try {
      consola.info('Attempting to run Cloudflare D1 migrations...')
      await migrateD1(d1Db, {
        migrationsFolder: 'server/database/d1/migrations',
      })
      consola.success('✅ Cloudflare D1 migrations completed successfully.')
    } catch (err) {
      consola.error('❌ Cloudflare D1 migrations failed:', err)
      // Note: D1 migrations are often less critical, but still important
      // to handle properly. You might choose to log the error and
      // continue here depending on your application's needs.
    }
  })
})