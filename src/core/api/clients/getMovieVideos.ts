import { MovieVideoResponseSchema } from '@/core/api/schemas/MovieVideoSchema';
import { tmdbClient } from './tmdbApi';
import { TMDBAPIError } from './tmdbApiError';

export async function getMovieVideos(movieId: number) {
  try {
    const params = {
      language: 'pt-BR',
      region: 'BR',
    };

    const response = await tmdbClient.request(`/movie/${movieId}/videos`, { params });
    const parsedResponse = MovieVideoResponseSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
