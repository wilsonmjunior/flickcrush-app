import { z } from 'zod';

import { MovieSchema } from '@/models/MovieSchema';
import { TMDBAPIError } from '.';
import { tmdbClient } from './tmdbApi';

const PopularMoviesSchema = z.object({
  results: z.array(MovieSchema),
});

export async function getPopularMovies(page: number) {
  try {
    const params = {
      language: 'pt-BR',
      page,
      region: 'BR',
    };

    const response = await tmdbClient.request('/movie/popular', { params });
    const parsedResponse = PopularMoviesSchema.parse(response);
    return parsedResponse;
  } catch (error: any) {
    throw new TMDBAPIError(error as string, error.status_code);
  }
}
