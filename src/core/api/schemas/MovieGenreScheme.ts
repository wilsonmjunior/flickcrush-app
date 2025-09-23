import { z } from 'zod';

export const MovieGenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieGenreResponseSchema = z.object({
  genres: z.array(MovieGenreSchema),
});

export type MovieGenreSchemaType = z.infer<typeof MovieGenreSchema>;

export type MovieGenreResponseSchemaType = z.infer<typeof MovieGenreResponseSchema>;
