import { z } from 'zod';

export const FavoriteMovieSchema = z.object({
  movieId: z.number(),
  title: z.string(),
  posterPath: z.string(),
  backdropPath: z.string(),
});

export const FavoriteMovieResponseSchema = z.object({
  backdrop_path: z.string(),
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string(),
});

export type FavoriteMovieSchemaType = z.infer<typeof FavoriteMovieSchema>;
export type FavoriteMovieResponseSchemaType = z.infer<typeof FavoriteMovieResponseSchema>;
