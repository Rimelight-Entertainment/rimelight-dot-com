import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const variantEnum = z.enum([`solid`, `outline`, `subtle`, `soft`, `ghost`, `link`])
const colorEnum = z.enum([`primary`, `secondary`, `neutral`, `error`, `warning`, `success`, `info`])
const sizeEnum = z.enum([`xs`, `sm`, `md`, `lg`, `xl`])

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: `icon` }),
  size: sizeEnum.optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum.optional(),
  variant: variantEnum.optional()
})

export default defineContentConfig({
  collections: {
    documents: defineCollection({
      type: `page`,
      source: `1.documents/**/*.md`,
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        type: z.enum([`Policy`, `Document`]),
        tags: z.array(z.string()),
        lastModified: z.date(),
        links: z.array(createLinkSchema())
      })
    }),
    blog: defineCollection({
      type: `page`,
      source: `2.blog/*.md`,
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        type: z.enum([`Article`]),
        tags: z.array(z.string()),
        image: z.string(),
        datePosted: z.date(),
        links: z.array(createLinkSchema())
      })
    }),
    entry: defineCollection({
      type: `page`,
      source: `3.entry/**/*.md`,
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        type: z.enum([`Character`]),
        tags: z.array(z.string()),
        lastModified: z.date(),
        links: z.array(createLinkSchema())
      })
    })
  }
})
