import { MovieGenreResponseSchema } from '@/models/MovieGenreScheme';
import { TMDBAPIError, tmdbClient } from '.';

export async function getMovieGenres() {
  try {
    const params = {
      language: 'pt-BR',
      region: 'BR',
    };

    const response = await tmdbClient.request('/genre/movie/list', { params });
    const parsedResponse = MovieGenreResponseSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
