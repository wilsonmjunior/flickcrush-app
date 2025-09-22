import { MovieDetailsSchema } from '@/models/MovieDetailsSchema';
import { TMDBAPIError } from '.';
import { tmdbClient } from './tmdbApi';

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
