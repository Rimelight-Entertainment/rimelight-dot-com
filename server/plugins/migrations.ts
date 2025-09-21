import { consola } from 'consola'
import { migrate } from 'drizzle-orm/neon-http/migrator'
import { useDb } from '../utils/drizzle'

export default defineNitroPlugin(() => {
  if (!import.meta.dev) return

  onHubReady(async () => {
    const db = useDb()

    try {
      consola.info(`Attempting to run Neon DB migrations...`)
      await migrate(db, {
        migrationsFolder: `server/database/migrations`
      })
      consola.success(`✅ Neon DB migrations completed successfully.`)
    } catch (err) {
      consola.error(`❌ Neon DB migrations failed:`, err)
      throw err
    }
  })
})
