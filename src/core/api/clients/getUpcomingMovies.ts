import { z } from 'zod';

import { MovieSchema } from '@/core/api/schemas/MovieSchema';
import { tmdbClient } from './tmdbApi';
import { TMDBAPIError } from './tmdbApiError';

const UpcomingMovieSchema = z.object({
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export async function getUpcomingMovies(page: number) {
  try {
    const params = {
      language: 'pt-BR',
      page,
      region: 'BR',
    };

    const response = await tmdbClient.request('/movie/upcoming', { params });

    const parsedResponse = UpcomingMovieSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
