import { z } from 'zod';

export const ScheduledMovieSchema = z.object({
  id: z.number(),
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  scheduled_date: z.string(), // ISO string
  scheduled_time: z.string(), // HH:mm format
  calendar_event_id: z.string().nullable(), // ID do evento no calendário
  notification_id: z.string().nullable(), // ID da notificação
  created_at: z.string(), // ISO string
  updated_at: z.string(), // ISO string
});

export const ScheduledMovieResponseSchema = z.object({
  id: z.number(),
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  scheduled_date: z.string(),
  scheduled_time: z.string(),
  calendar_event_id: z.string().nullable(),
  notification_id: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ScheduledMovieInputSchema = z.object({
  tmdb_id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  scheduled_date: z.string(),
  scheduled_time: z.string(),
  calendar_event_id: z.string().nullable().optional(),
  notification_id: z.string().nullable().optional(),
});

export type ScheduledMovie = z.infer<typeof ScheduledMovieSchema>;
export type ScheduledMovieResponse = z.infer<typeof ScheduledMovieResponseSchema>;
export type ScheduledMovieInput = z.infer<typeof ScheduledMovieInputSchema>;
