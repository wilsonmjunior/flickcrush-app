import { z } from 'zod';

import { MovieSchema } from '@/core/api/schemas/MovieSchema';
import { TMDBAPIError, tmdbClient } from '.';

const SearchMoviesSchema = z.object({
  results: z.array(MovieSchema),
});

export async function searchMovies(page: number, query: string) {
  try {
    const params = {
      language: 'pt-BR',
      page,
      region: 'BR',
      query,
    };

    const response = await tmdbClient.request('/search/movie', { params });
    const parsedResponse = SearchMoviesSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
