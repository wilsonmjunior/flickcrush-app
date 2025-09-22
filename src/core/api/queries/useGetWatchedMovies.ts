import { useQuery } from '@tanstack/react-query';

import { useWatchedMoviesDatabase } from '@/core/database';

export const watchedMoviesKey = 'WatchedMovies';

export function useGetWatchedMovies() {
  const { getWatchedMovies } = useWatchedMoviesDatabase();

  return useQuery({
    queryKey: [watchedMoviesKey],
    queryFn: getWatchedMovies,
    staleTime: 0, // Always refetch when invalidated
  });
}
