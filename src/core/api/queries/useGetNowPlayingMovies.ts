import { useInfiniteQuery } from '@tanstack/react-query';

import { getNowPlayingMovies } from '../clients';

const tmdbNowPlayingMoviesKey = 'Tmdb:NowPlayingMovies';

export function useGetNowPlayingMovies(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: [tmdbNowPlayingMoviesKey],
    queryFn: ({ pageParam = 1 }) => getNowPlayingMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.results.length === 20;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled,
  });
}
