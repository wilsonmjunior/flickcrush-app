import { z } from 'zod';

export const WatchedMovieSchema = z.object({
  movieId: z.number(),
  title: z.string(),
  posterPath: z.string(),
  backdropPath: z.string(),
});

export const WatchedMovieResponseSchema = z.object({
  backdrop_path: z.string(),
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string(),
});

export type WatchedMovieSchemaType = z.infer<typeof WatchedMovieSchema>;
export type WatchedMovieResponseSchemaType = z.infer<typeof WatchedMovieResponseSchema>;
