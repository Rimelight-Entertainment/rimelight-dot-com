import {
  z
} from 'zod'
import tryParseEnv from '../utils/try-parse-env'

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  NUXT_POSTGRES_URL: z.string(),
  NUXT_POSTGRES_DEVELOPMENT_URL: z.string(),
  NUXT_SESSION_PASSWORD: z.string(),
  NUXT_TURNSTILE_SECRET_KEY: z.string(),
  NUXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  SITE_PASSWORD: z.string()
})

export type EnvSchema = z.infer<typeof EnvSchema>

tryParseEnv(EnvSchema)

// eslint-disable-next-line no-process-env
export default EnvSchema.parse(process.env)
