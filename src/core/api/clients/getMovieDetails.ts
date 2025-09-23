import { MovieDetailsSchema } from '@/core/api/schemas/MovieDetailsSchema';
import { tmdbClient } from './tmdbApi';
import { TMDBAPIError } from './tmdbApiError';

export async function getMovieDetails(id: number) {
  try {
    const params = {
      language: 'pt-BR',
      region: 'BR',
    };

    const response = await tmdbClient.request(`/movie/${id}`, { params });
    const parsedResponse = MovieDetailsSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
