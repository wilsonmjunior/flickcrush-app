import { useInfiniteQuery } from '@tanstack/react-query';

import { getDiscoverMovies } from '../clients/getDiscoverMovies';

const tmdbDiscoverMoviesKey = 'Tmdb:DiscoverMovies';

export function useGetDiscoverMovies() {
  return useInfiniteQuery({
    queryKey: [tmdbDiscoverMoviesKey],
    queryFn: ({ pageParam = 1 }) => getDiscoverMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.results.length === 20;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
