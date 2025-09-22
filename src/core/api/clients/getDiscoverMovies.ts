import { z } from 'zod';

import { MovieSchema } from '@/core/api/schemas/MovieSchema';
import { TMDBAPIError } from '.';
import { tmdbClient } from './tmdbApi';

const DiscoverMoviesSchema = z.object({
  results: z.array(MovieSchema),
});

export async function getDiscoverMovies(page: number) {
  try {
    const params = {
      language: 'pt-BR',
      page,
      region: 'BR',
    };

    const response = await tmdbClient.request('/discover/movie', { params });
    const parsedResponse = DiscoverMoviesSchema.parse(response);
    return parsedResponse;
  } catch (error: any) {
    throw new TMDBAPIError(error as string, error.status_code);
  }
}
