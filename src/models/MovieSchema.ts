import { z } from 'zod';

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullish(),
  backdrop_path: z.string().nullish(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type MovieSchemaType = z.infer<typeof MovieSchema>;
