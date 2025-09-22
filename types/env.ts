import { z } from 'zod'
import tryParseEnv from '../utils/try-parse-env'

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  NUXT_POSTGRES_URL: z.string(),
  NUXT_POSTGRES_DEVELOPMENT_URL: z.string(),
  NUXT_SESSION_PASSWORD: z.string()
})

tryParseEnv(EnvSchema)

export type EnvSchema = z.infer<typeof EnvSchema>
export default EnvSchema.parse(process.env)
