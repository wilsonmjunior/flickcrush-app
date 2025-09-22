import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useMemo } from 'react';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/core/api/config';
import { useMarkAsWatchedMovie, useUnmarkAsWatchedMovie } from '@/core/api/mutations';
import { isWatchedMovieKey } from '@/core/api/queries';
import { MovieSchemaType } from '@/core/api/schemas';

export function useWatchedMovie(isWatched: boolean) {
  const { mutateAsync: markAsWatched } = useMarkAsWatchedMovie({
    onSuccess: async (_, movie) => {
      await queryClient.invalidateQueries({
        queryKey: [isWatchedMovieKey, movie.movieId],
      });

      Toast.show({
        type: 'success',
        text1: 'Filme marcado como assistido',
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao marcar filme como assistido',
      });
    },
  });
  const { mutateAsync: unmarkAsWatched } = useUnmarkAsWatchedMovie({
    onSuccess: async (_, movieId) => {
      await queryClient.invalidateQueries({
        queryKey: [isWatchedMovieKey, movieId],
      });

      Toast.show({
        type: 'success',
        text1: 'Filme removido da lista de assistidos',
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao remover filme da lista de assistidos',
      });
    },
  });

  const handleWatched = useCallback(
    (movie: MovieSchemaType) => {
      if (isWatched) {
        unmarkAsWatched(movie.id);
      } else {
        markAsWatched({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path ?? '',
          backdropPath: movie.backdrop_path ?? '',
        });
      }
    },
    [isWatched, markAsWatched, unmarkAsWatched]
  );

  const watchedIcon = useMemo((): keyof typeof MaterialCommunityIcons.glyphMap => {
    return isWatched ? 'eye-check' : 'eye-outline';
  }, [isWatched]);

  return {
    watchedIcon,
    handleWatched,
  };
}
