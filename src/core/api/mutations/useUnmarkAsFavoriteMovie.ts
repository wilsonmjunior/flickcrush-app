import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { useFavoriteMoviesDatabase } from '@/core/database';

const unmarkAsFavoriteMovieKey = 'UnmarkAsFavoriteMovie';

export function useUnmarkAsFavoriteMovie(props?: UseMutationOptions<void, Error, number>) {
  const { unmarkAsFavorite } = useFavoriteMoviesDatabase();

  return useMutation({
    mutationKey: [unmarkAsFavoriteMovieKey],
    mutationFn: async (movieId: number) => await unmarkAsFavorite(movieId),
    ...props,
  });
}
