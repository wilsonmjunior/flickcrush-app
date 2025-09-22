import { useQuery } from '@tanstack/react-query';

import { useWatchedMoviesDatabase } from '@/database';

export const isWatchedMovieKey = 'IsWatchedMovie';

export function useGetIsWatchedMovie(movieId: number) {
  const { getIsWatchedMovie } = useWatchedMoviesDatabase();

  return useQuery({
    queryKey: [isWatchedMovieKey, movieId],
    queryFn: () => getIsWatchedMovie(movieId),
    staleTime: 0, // Always refetch when invalidated
  });
}
