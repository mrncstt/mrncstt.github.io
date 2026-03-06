import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    image: z.string().optional(),
    listed: z.boolean().default(true),
    til: z.boolean().default(false),
    math: z.boolean().default(false),
    mermaid: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { posts };
