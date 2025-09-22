import { useQuery } from '@tanstack/react-query';

import { useFavoriteMoviesDatabase } from '@/database';

export const favoriteMoviesKey = 'FavoriteMovies';

export function useGetFavoriteMovies() {
  const { getFavoriteMovies } = useFavoriteMoviesDatabase();

  return useQuery({
    queryKey: [favoriteMoviesKey],
    queryFn: getFavoriteMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
