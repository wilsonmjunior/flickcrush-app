import { useQuery } from '@tanstack/react-query';

import { useScheduledMoviesDatabase } from '@/core/database';

export const scheduledMoviesQueryKey = ['scheduledMovies'];

export function useGetScheduledMovies() {
  const { getScheduledMovies } = useScheduledMoviesDatabase();

  return useQuery({
    queryKey: scheduledMoviesQueryKey,
    queryFn: getScheduledMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
