import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { FavoriteMovieSchemaType, useFavoriteMoviesDatabase } from '@/core/database';

const markAsFavoriteMovieKey = 'MarkAsFavoriteMovie';

export function useMarkAsFavoriteMovie(
  props?: UseMutationOptions<void, Error, FavoriteMovieSchemaType>
) {
  const { markAsFavorite } = useFavoriteMoviesDatabase();

  return useMutation({
    mutationKey: [markAsFavoriteMovieKey],
    mutationFn: async (data: FavoriteMovieSchemaType) => {
      return await markAsFavorite(data);
    },
    ...props,
  });
}
