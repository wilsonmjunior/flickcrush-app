import { useSQLiteContext } from 'expo-sqlite';

import {
  ScheduledMovieInput,
  ScheduledMovieInputSchema,
  ScheduledMovieResponseSchema,
} from '@/models/ScheduledMovieSchema';

export function useScheduledMoviesDatabase() {
  const database = useSQLiteContext();

  async function addScheduledMovie(data: ScheduledMovieInput) {
    try {
      const parsedData = ScheduledMovieInputSchema.parse(data);

      const statement = await database.prepareAsync(`
        INSERT INTO scheduled_movies (tmdb_id, title, poster_path, backdrop_path, scheduled_date, scheduled_time, calendar_event_id, notification_id)
        VALUES ($tmdb_id, $title, $poster_path, $backdrop_path, $scheduled_date, $scheduled_time, $calendar_event_id, $notification_id);
      `);

      const result = await statement.executeAsync({
        $tmdb_id: parsedData.tmdb_id,
        $title: parsedData.title,
        $poster_path: parsedData.poster_path,
        $backdrop_path: parsedData.backdrop_path,
        $scheduled_date: parsedData.scheduled_date,
        $scheduled_time: parsedData.scheduled_time,
        $calendar_event_id: parsedData.calendar_event_id || null,
        $notification_id: parsedData.notification_id || null,
      });

      const insertId = result.lastInsertRowId;
      statement.finalizeAsync();

      // Retornar o filme criado
      const getStatement = await database.prepareAsync(`
        SELECT * FROM scheduled_movies WHERE id = $id;
      `);

      const getResult = await getStatement.executeAsync({
        $id: insertId,
      });

      const row = await getResult.getFirstAsync();
      getStatement.finalizeAsync();

      return ScheduledMovieResponseSchema.parse(row);
    } catch (error) {
      throw error;
    }
  }

  async function removeScheduledMovie(id: number) {
    try {
      const statement = await database.prepareAsync(`
        DELETE FROM scheduled_movies WHERE id = $id;
      `);

      await statement.executeAsync({
        $id: id,
      });

      statement.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  async function updateScheduledMovie(id: number, updates: Partial<ScheduledMovieInput>) {
    try {
      const updateFields = Object.keys(updates)
        .map((key) => `${key} = $${key}`)
        .join(', ');

      const statement = await database.prepareAsync(`
        UPDATE scheduled_movies 
        SET ${updateFields}, updated_at = current_timestamp 
        WHERE id = $id;
      `);

      const params: Record<string, any> = { $id: id };
      Object.entries(updates).forEach(([key, value]) => {
        params[`$${key}`] = value;
      });

      await statement.executeAsync(params);
      statement.finalizeAsync();
    } catch (error) {
      throw error;
    }
  }

  async function getScheduledMovies() {
    try {
      const statement = await database.prepareAsync(`
        SELECT * FROM scheduled_movies ORDER BY scheduled_date ASC, scheduled_time ASC;
      `);

      const result = await statement.executeAsync();
      const rows = await result.getAllAsync();
      statement.finalizeAsync();

      const parsedRows = ScheduledMovieResponseSchema.array().parse(rows);
      return parsedRows;
    } catch (error) {
      throw error;
    }
  }

  async function getScheduledMovie(movieId: number) {
    try {
      const statement = await database.prepareAsync(`
        SELECT * FROM scheduled_movies WHERE tmdb_id = $tmdb_id;
      `);

      const result = await statement.executeAsync({
        $tmdb_id: movieId,
      });

      const row = await result.getFirstAsync();
      statement.finalizeAsync();

      if (!row) return null;
      return ScheduledMovieResponseSchema.parse(row);
    } catch (error) {
      console.log('error:getScheduledMovie', error);
      return null;
    }
  }

  async function isMovieScheduled(movieId: number) {
    try {
      const statement = await database.prepareAsync(`
        SELECT 1 FROM scheduled_movies WHERE tmdb_id = $tmdb_id;
      `);

      const result = await statement.executeAsync({
        $tmdb_id: movieId,
      });

      const row = await result.getFirstAsync();
      statement.finalizeAsync();

      return Boolean(row);
    } catch (error) {
      console.log('error:isMovieScheduled', error);
      return false;
    }
  }

  return {
    addScheduledMovie,
    removeScheduledMovie,
    updateScheduledMovie,
    getScheduledMovies,
    getScheduledMovie,
    isMovieScheduled,
  };
}
