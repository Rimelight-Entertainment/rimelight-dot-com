import {
  defineContentConfig, defineCollection, z
} from '@nuxt/content'

const variantEnum = z.enum([
  `solid`,
  `outline`,
  `subtle`,
  `soft`,
  `ghost`,
  `link`
])

const colorEnum = z.enum([
  `primary`,
  `secondary`,
  `neutral`,
  `error`,
  `warning`,
  `success`,
  `info`
])

const Image = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional()
})

const Link = z.object({
  label: z.string(),
  to: z.string(),
  icon: z.string().optional(),
  trailing: z.boolean().optional(),
  color: colorEnum.optional(),
  variant: variantEnum.optional()
})

const Author = z.object({
  avatar: Image.optional(),
  name: z.string(),
  username: z.string().optional(),
  to: z.string().optional()
})

export default defineContentConfig({
  collections: {
    documents: defineCollection({
      type: `page`,
      source: `1.documents/**/*.md`,
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        type: z.enum([
          `Policy`,
          `Document`
        ]),
        tags: z.array(z.string()),
        lastModified: z.date(),
        links: z.array(Link).optional()
      })
    }),
    blog: defineCollection({
      type: `page`,
      source: `2.blog/**/*.md`,
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        category: z.enum([
          `Blog Post`
        ]),
        image: Image.optional(),
        datePosted: z.date(),
        links: z.array(Link).optional(),
        authors: z.array(Author).optional()
      })
    })
  }
})
