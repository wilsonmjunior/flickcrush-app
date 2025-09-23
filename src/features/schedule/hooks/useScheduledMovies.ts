import { useQuery } from '@tanstack/react-query';

import { useScheduledMoviesDatabase } from '@/core/database';

export function useScheduledMovies() {
  const { getScheduledMovies } = useScheduledMoviesDatabase();

  return useQuery({
    queryKey: ['scheduledMovies'],
    queryFn: getScheduledMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
