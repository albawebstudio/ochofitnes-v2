import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md'
        }),

    newsletter: defineCollection({
      type: 'page',
      source: '*/newsletter/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        image: z.string().optional(),
        published_date: z.string().optional(), // "YYYY-MM-DD" sorts correctly as a string
      }),
    }),
  },
})
