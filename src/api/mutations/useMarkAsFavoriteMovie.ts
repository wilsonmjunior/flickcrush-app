import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { useFavoriteMoviesDatabase } from '@/database';
import { FavoriteMovieSchemaType } from '@/models/FavoriteMovieSchema';

const markAsFavoriteMovieKey = 'MarkAsFavoriteMovie';

export function useMarkAsFavoriteMovie(
  props?: UseMutationOptions<void, Error, FavoriteMovieSchemaType>
) {
  const { markAsFavorite } = useFavoriteMoviesDatabase();

  return useMutation({
    mutationKey: [markAsFavoriteMovieKey],
    mutationFn: async (data: FavoriteMovieSchemaType) => {
      console.log('markAsFavorite mutation called with data:', data);
      return await markAsFavorite(data);
    },
    ...props,
  });
}
