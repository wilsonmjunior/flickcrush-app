import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import {
  useGetIsFavoriteMovie,
  useGetIsWatchedMovie,
  useGetMovieDetails,
  useGetMovieVideos,
} from '@/core/api/queries';
import { useScheduledMoviesDatabase } from '@/core/database';
import { useFavoriteMovie } from '@/features/favorites/hooks';
import { useCalendarIntegration } from '@/features/schedule/hooks';
import { useWatchedMovie } from '@/features/watched/hooks';

interface UseMovieDetailsProps {
  movieId: number;
}

export function useMovieDetails({ movieId }: UseMovieDetailsProps) {
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [isMovieScheduledForUser, setIsMovieScheduledForUser] = useState(false);
  const [scheduledMovie, setScheduledMovie] = useState<any>(null);

  // Data fetching
  const { data: movie } = useGetMovieDetails(movieId);
  const { data: movieVideos } = useGetMovieVideos(movieId);
  const { data: isWatchedMovie, refetch: refetchIsWatchedMovie } = useGetIsWatchedMovie(movieId);
  const { data: isFavoriteMovie, refetch: refetchIsFavoriteMovie } = useGetIsFavoriteMovie(movieId);

  // Database operations
  const {
    addScheduledMovie,
    removeScheduledMovie,
    updateScheduledMovie,
    isMovieScheduled,
    getScheduledMovie,
  } = useScheduledMoviesDatabase();

  // Calendar integration
  const { scheduleMovie, unscheduleMovie } = useCalendarIntegration();

  const { handleFavorite, favoriteIcon } = useFavoriteMovie(isFavoriteMovie ?? false);
  const { handleWatched, watchedIcon } = useWatchedMovie(isWatchedMovie ?? false);

  const trailerVideos = useMemo(() => {
    return movieVideos?.results.filter((video) => video.type === 'Trailer');
  }, [movieVideos]);

  const handleScheduleMovie = useCallback(() => {
    setIsScheduleModalVisible(true);
  }, []);

  const handleCloseScheduleModal = useCallback(() => {
    setIsScheduleModalVisible(false);
  }, []);

  const handleConfirmSchedule = useCallback(
    async (date: Date, time: string) => {
      if (!movie) return;

      try {
        const scheduledDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

        // Criar filme agendado no banco local
        const scheduledMovie = await addScheduledMovie({
          tmdb_id: movieId,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          scheduled_date: scheduledDate,
          scheduled_time: time,
          calendar_event_id: null,
          notification_id: null,
        });

        // Criar evento no calendário e notificação
        const { eventId, notificationId } = await scheduleMovie(scheduledMovie);

        // Atualizar com IDs do calendário e notificação
        if (eventId || notificationId) {
          await updateScheduledMovie(scheduledMovie.id, {
            calendar_event_id: eventId,
            notification_id: notificationId,
          });
        }

        Toast.show({
          type: 'success',
          text1: 'Filme agendado com sucesso!',
          text2: `${movie.title} foi adicionado ao seu calendário`,
        });
      } catch (error) {
        console.error('Error scheduling movie:', error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao agendar filme',
          text2: 'Tente novamente mais tarde',
        });
      }
    },
    [movie, movieId, addScheduledMovie, scheduleMovie, updateScheduledMovie]
  );

  const handleUnscheduleMovie = useCallback(async () => {
    try {
      const scheduledMovie = await getScheduledMovie(movieId);
      if (!scheduledMovie) return;

      // Remover do calendário e cancelar notificação
      await unscheduleMovie(scheduledMovie);

      // Remover do banco local
      await removeScheduledMovie(scheduledMovie.id);

      Toast.show({
        type: 'success',
        text1: 'Agendamento removido',
        text2: 'O filme foi removido do seu calendário',
      });
    } catch (error) {
      console.error('Error unscheduling movie:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao remover agendamento',
      });
    }
  }, [movieId, getScheduledMovie, unscheduleMovie, removeScheduledMovie]);

  // Check if movie is scheduled
  useEffect(() => {
    const checkScheduledStatus = async () => {
      try {
        const isScheduled = await isMovieScheduled(movieId);
        const scheduled = await getScheduledMovie(movieId);
        setIsMovieScheduledForUser(isScheduled);
        setScheduledMovie(scheduled);
      } catch (error) {
        console.error('Error checking scheduled status:', error);
      }
    };

    checkScheduledStatus();
  }, [movieId, isMovieScheduled, getScheduledMovie]);

  const scheduleButtonText = useMemo(() => {
    if (isMovieScheduledForUser) {
      return 'Desagendar';
    }
    return 'Agendar';
  }, [isMovieScheduledForUser]);

  const scheduleButtonIcon = useMemo((): keyof typeof MaterialCommunityIcons.glyphMap => {
    return isMovieScheduledForUser ? 'calendar-remove' : 'calendar-plus';
  }, [isMovieScheduledForUser]);

  return {
    // Data
    movie,
    movieVideos,
    isWatchedMovie,
    isFavoriteMovie,
    trailerVideos,
    isMovieScheduled: isMovieScheduledForUser,
    scheduledMovie,

    // Icons
    watchedIcon,
    favoriteIcon,
    scheduleButtonIcon,

    // Handlers
    handleWatched,
    handleFavorite,
    handleScheduleMovie,
    handleUnscheduleMovie,
    handleConfirmSchedule,
    handleCloseScheduleModal,

    // Modal state
    isScheduleModalVisible,

    // Schedule button
    scheduleButtonText,

    // Refetch functions
    refetchIsWatchedMovie,
    refetchIsFavoriteMovie,
  };
}
