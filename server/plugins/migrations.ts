import { consola } from 'consola'
import { migrate } from 'drizzle-orm/neon-serverless/migrator'
import { useDb } from '~~/server/utils/drizzle'

export default defineNitroPlugin(() => {
  if (!import.meta.dev) return

  onHubReady(async () => {
    try {
      const { db } = useDb()
      await migrate(db, {
        migrationsFolder: 'server/database/drizzle',
      })
      consola.success('✅ Database migrations completed')
    } catch (err) {
      consola.error('❌ Database migrations failed', err)
    }
  })
})