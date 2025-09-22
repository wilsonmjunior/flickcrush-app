import { z } from 'zod';

export const MovieVideoItemSchema = z.object({
  id: z.string(),
  iso_3166_1: z.string().length(2),
  iso_639_1: z.string().length(2),
  key: z.string(),
  name: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
});

export const MovieVideoResponseSchema = z.object({
  id: z.number(),
  results: z.array(MovieVideoItemSchema),
});

export type MovieVideoItemType = z.infer<typeof MovieVideoItemSchema>;
export type MovieVideoResponseType = z.infer<typeof MovieVideoResponseSchema>;
