import { drizzle, type NeonClient } from 'drizzle-orm/neon-serverless'
import { neon } from '@neondatabase/serverless'
import postgres from 'postgres'
import { schema } from '~~/server/database/schema'

export function useDb() {
  const url = process.env.NUXT_POSTGRES_URL
  if (!url) {
    throw createError('Missing `NUXT_POSTGRES_URL` environment variable')
  }

  const client = neon(url) as unknown as NeonClient
  const db = drizzle(client, { schema })

  const raw = postgres(url, { ssl: 'require' })

  return { db, raw }
}