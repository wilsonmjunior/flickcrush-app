import { useSQLiteContext } from 'expo-sqlite';

import {
  WatchedMovieResponseSchema,
  WatchedMovieSchema,
  WatchedMovieSchemaType,
} from '@/models/WatchedMovieSchema';

export function useFavoriteMoviesDatabase() {
  const database = useSQLiteContext();

  async function markAsFavorite(data: WatchedMovieSchemaType) {
    try {
      const parsedData = WatchedMovieSchema.parse(data);

      const statement = await database.prepareAsync(`
        INSERT INTO favorite_movies (tmdb_id, title, poster_path, backdrop_path)
        VALUES ($tmdb_id, $title, $poster_path, $backdrop_path);
      `);

      statement.executeAsync({
        $tmdb_id: parsedData.movieId,
        $title: parsedData.title,
        $poster_path: parsedData.posterPath,
        $backdrop_path: parsedData.backdropPath,
      });
    } catch (error) {
      throw error;
    }
  }

  async function unmarkAsFavorite(movieId: number) {
    try {
      const statement = await database.prepareAsync(`
        DELETE FROM favorite_movies WHERE tmdb_id = $tmdb_id;
      `);

      statement.executeAsync({
        $tmdb_id: movieId,
      });
    } catch (error) {
      throw error;
    }
  }

  async function getFavoriteMovies() {
    try {
      const statement = await database.prepareAsync(`
        SELECT * FROM favorite_movies;
      `);

      const result = await statement.executeAsync();

      const rows = await result.getAllAsync();
      const parsedRows = WatchedMovieResponseSchema.array().parse(rows);
      return parsedRows;
    } catch (error) {
      throw error;
    }
  }

  async function getIsFavoriteMovie(movieId: number) {
    try {
      const statement = await database.prepareAsync(`
        SELECT 1 FROM favorite_movies WHERE tmdb_id = $tmdb_id
      `);

      const result = await statement.executeAsync({
        $tmdb_id: movieId,
      });

      const row = await result.getFirstAsync();

      return Boolean(row);
    } catch (error) {
      console.log('error:isWatched', error);
      return false;
    }
  }

  return {
    markAsFavorite,
    unmarkAsFavorite,
    getFavoriteMovies,
    getIsFavoriteMovie,
  };
}
