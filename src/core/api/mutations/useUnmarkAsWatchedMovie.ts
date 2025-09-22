import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { useWatchedMoviesDatabase } from '@/core/database';

const unmarkAsWatchedMovieKey = 'UnmarkAsWatchedMovie';

export function useUnmarkAsWatchedMovie(props?: UseMutationOptions<void, Error, number>) {
  const { unmarkAsWatched } = useWatchedMoviesDatabase();

  return useMutation({
    mutationKey: [unmarkAsWatchedMovieKey],
    mutationFn: async (movieId: number) => await unmarkAsWatched(movieId),
    ...props,
  });
}
