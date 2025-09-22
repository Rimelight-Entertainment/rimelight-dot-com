import type {
  ZodObject, ZodRawShape
} from 'zod'
import {
  ZodError
} from 'zod'

export default function tryParseEnv<T extends ZodRawShape>(EnvSchema: ZodObject<T>,
  // eslint-disable-next-line no-process-env
  buildEnv: Record<string, string | undefined> = process.env) {
  try {
    return EnvSchema.parse(buildEnv)
  } catch(error) {
    if (error instanceof ZodError) {
      let message = `Missing required values in .env\n`
      error.issues.forEach((issue) => {
        message += `${ issue.path[0] }\n`
      })
      const e = new Error(message)
      e.stack = ``
      throw e
    }
    throw error
  }
}
