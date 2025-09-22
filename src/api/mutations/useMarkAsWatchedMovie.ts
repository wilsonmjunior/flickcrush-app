import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { useWatchedMoviesDatabase } from '@/database';
import { WatchedMovieSchemaType } from '@/models/WatchedMovieSchema';

const markAsWatchedMovieKey = 'MarkAsWatchedMovie';

export function useMarkAsWatchedMovie(
  props?: UseMutationOptions<void, Error, WatchedMovieSchemaType>
) {
  const { markAsWatched } = useWatchedMoviesDatabase();

  return useMutation({
    mutationKey: [markAsWatchedMovieKey],
    mutationFn: async (data: WatchedMovieSchemaType) => await markAsWatched(data),
    ...props,
  });
}
