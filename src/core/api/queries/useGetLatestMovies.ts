import { useInfiniteQuery } from '@tanstack/react-query';

import { getLatestMovies } from '../clients';

export const tmdbLatestMoviesKey = 'Tmdb:LatestMovies';

export function useGetLatestMovies(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: [tmdbLatestMoviesKey],
    queryFn: ({ pageParam = 1 }) => getLatestMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.results.length === 20;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled,
  });
}
