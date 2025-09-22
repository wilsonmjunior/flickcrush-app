import { useQuery } from '@tanstack/react-query';

import { getMovieGenres } from '../clients';

const tmdbMovieGenresKey = 'Tmdb:MovieGenres';

export function useGetMovieGenres() {
  return useQuery({
    queryKey: [tmdbMovieGenresKey],
    queryFn: getMovieGenres,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
