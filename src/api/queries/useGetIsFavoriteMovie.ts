import { useQuery } from '@tanstack/react-query';

import { useFavoriteMoviesDatabase } from '@/database';

export const isFavoriteMoviesKey = 'IsFavoriteMovies';

export function useGetIsFavoriteMovie(movieId: number) {
  const { getIsFavoriteMovie } = useFavoriteMoviesDatabase();

  return useQuery({
    queryKey: [isFavoriteMoviesKey, movieId],
    queryFn: () => getIsFavoriteMovie(movieId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
