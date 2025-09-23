import { z } from 'zod';

export const ScheduledMovieSchema = z.object({
  id: z.number(),
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string().nullish(),
  backdrop_path: z.string().nullish(),
  scheduled_date: z.string(), // ISO string
  scheduled_time: z.string(), // HH:mm format
  calendar_event_id: z.string().nullish(), // ID do evento no calendário
  notification_id: z.string().nullish(), // ID da notificação
  created_at: z.string(), // ISO string
  updated_at: z.string(), // ISO string
});

export const ScheduledMovieResponseSchema = z.object({
  id: z.number(),
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string().nullish(),
  backdrop_path: z.string().nullish(),
  scheduled_date: z.string(),
  scheduled_time: z.string(),
  calendar_event_id: z.string().nullish(),
  notification_id: z.string().nullish(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ScheduledMovieInputSchema = z.object({
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string().nullish(),
  backdrop_path: z.string().nullish(),
  scheduled_date: z.string(),
  scheduled_time: z.string(),
  calendar_event_id: z.string().nullish().optional(),
  notification_id: z.string().nullish().optional(),
});

export type ScheduledMovie = z.infer<typeof ScheduledMovieSchema>;
export type ScheduledMovieResponse = z.infer<typeof ScheduledMovieResponseSchema>;
export type ScheduledMovieInput = z.infer<typeof ScheduledMovieInputSchema>;
