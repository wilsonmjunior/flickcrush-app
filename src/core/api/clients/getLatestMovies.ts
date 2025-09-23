import { z } from 'zod';

import { MovieSchema } from '@/core/api/schemas/MovieSchema';
import { tmdbClient } from './tmdbApi';
import { TMDBAPIError } from './tmdbApiError';

const LatestMoviesSchema = z.object({
  results: z.array(MovieSchema),
});

export async function getLatestMovies(page: number) {
  try {
    const params = {
      language: 'pt-BR',
      page,
      region: 'BR',
    };

    const response = await tmdbClient.request('/movie/now_playing', { params });
    const parsedResponse = LatestMoviesSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
