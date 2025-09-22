import { useInfiniteQuery } from '@tanstack/react-query';
import { getUpcomingMovies } from '../clients';

export const tmdbUpcomingMoviesKey = 'Tmdb:UpcomingMovies';

export function useGetUpcomingMovies(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: [tmdbUpcomingMoviesKey],
    queryFn: ({ pageParam = 1 }) => getUpcomingMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.results.length === 20;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled,
  });
}
