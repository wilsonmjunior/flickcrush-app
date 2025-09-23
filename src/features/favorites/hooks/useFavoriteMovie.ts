import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useMemo } from 'react';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/core/api/config';
import { useMarkAsFavoriteMovie, useUnmarkAsFavoriteMovie } from '@/core/api/mutations';
import { isFavoriteMoviesKey } from '@/core/api/queries';
import { MovieSchemaType } from '@/core/api/schemas';

export function useFavoriteMovie(isFavorite: boolean) {
  const { mutateAsync: markAsFavorite } = useMarkAsFavoriteMovie({
    onSuccess: async (data, movie, ...restProps) => {
      await queryClient.invalidateQueries({
        queryKey: [isFavoriteMoviesKey, movie.movieId],
      });

      Toast.show({
        type: 'success',
        text1: 'Filme marcado como favorito',
      });
      return { data, movie, ...restProps };
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao marcar filme como favorito',
      });
    },
  });
  const { mutateAsync: unmarkAsFavorite } = useUnmarkAsFavoriteMovie({
    onSuccess: async (data, movieId, ...restProps) => {
      await queryClient.invalidateQueries({
        queryKey: [isFavoriteMoviesKey, movieId],
      });

      Toast.show({
        type: 'success',
        text1: 'Filme removido da lista de favoritos',
      });

      return { data, movieId, ...restProps };
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Erro ao remover filme da lista de favoritos',
      });
    },
  });

  const handleFavorite = useCallback(
    (movie: MovieSchemaType) => {
      if (isFavorite) {
        unmarkAsFavorite(movie.id);
      } else {
        markAsFavorite({
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path ?? '',
          backdropPath: movie.backdrop_path ?? '',
        });
      }
    },
    [isFavorite, markAsFavorite, unmarkAsFavorite]
  );

  const favoriteIcon = useMemo((): keyof typeof MaterialCommunityIcons.glyphMap => {
    return isFavorite ? 'bookmark' : 'bookmark-outline';
  }, [isFavorite]);

  return {
    favoriteIcon,
    handleFavorite,
  };
}
