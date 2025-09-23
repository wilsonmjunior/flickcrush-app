import { useQuery } from '@tanstack/react-query';

import { getMovieDetails } from '../clients';

const tmdbMovieDetailsKey = 'Tmdb:MovieDetails';

export function useGetMovieDetails(movieId: number) {
  return useQuery({
    queryKey: [tmdbMovieDetailsKey, movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
