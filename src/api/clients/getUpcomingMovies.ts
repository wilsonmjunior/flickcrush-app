import { z } from 'zod';

import { MovieSchema } from '@/models/MovieSchema';
import { TMDBAPIError } from '.';
import { tmdbClient } from './tmdbApi';

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
    console.log('error::gay: ', error);
    throw new TMDBAPIError(error as string, 500);
  }
}
