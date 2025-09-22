import { z } from 'zod';
import { MovieGenreSchema } from './MovieGenreScheme';

export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  runtime: z.number(),
  genres: MovieGenreSchema.array(),
  homepage: z.string(),
});

export type MovieDetailsSchemaType = z.infer<typeof MovieDetailsSchema>;
