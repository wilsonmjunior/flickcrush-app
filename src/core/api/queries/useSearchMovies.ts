import { useInfiniteQuery } from '@tanstack/react-query';

import { searchMovies } from '../clients';

const tmdbMovieSearchKey = 'Tmdb:MovieSearch';

export function useSearchMovies(query: string) {
  return useInfiniteQuery({
    queryKey: [tmdbMovieSearchKey, query],
    queryFn: ({ pageParam = 1 }) => searchMovies(pageParam, query),
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.results.length === 20;
      return hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: query.trim().length > 0, // Só executa a query se houver texto na busca
  });
}
