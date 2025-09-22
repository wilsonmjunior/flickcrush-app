import { z } from 'zod';

import { MovieSchema } from '@/core/api/schemas/MovieSchema';
import { TMDBAPIError } from '.';
import { tmdbClient } from './tmdbApi';

const NowPlayingMoviesSchema = z.object({
  results: z.array(MovieSchema),
});

export async function getNowPlayingMovies(page: number) {
  try {
    const params = {
      language: 'pt-BR',
      page,
      region: 'BR',
    };

    const response = await tmdbClient.request('/movie/now_playing', { params });
    const parsedResponse = NowPlayingMoviesSchema.parse(response);
    return parsedResponse;
  } catch (error) {
    throw new TMDBAPIError(error as string, 500);
  }
}
