import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
};
