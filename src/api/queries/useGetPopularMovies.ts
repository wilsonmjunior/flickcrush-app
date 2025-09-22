import { useInfiniteQuery } from '@tanstack/react-query';

import { getPopularMovies } from '../clients';

export const tmdbMoviePopularKey = 'Tmdb:MoviePopular';

export function useGetPopularMovies(enabled?: boolean) {
  return useInfiniteQuery({
    queryKey: [tmdbMoviePopularKey],
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.results.length === 20;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled,
  });
}
