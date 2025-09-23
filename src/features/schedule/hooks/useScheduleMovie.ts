import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { MovieSchemaType } from '@/core/api/schemas';
import { ScheduledMovie, useScheduledMoviesDatabase } from '@/core/database';
import { useCalendarIntegration } from './useCalendarIntegration';

export function useScheduleMovie(movie: MovieSchemaType) {
  const [isMovieScheduledForUser, setIsMovieScheduledForUser] = useState(false);
  const [scheduledMovie, setScheduledMovie] = useState<ScheduledMovie | null>(null);

  // Database operations
  const {
    addScheduledMovie,
    removeScheduledMovie,
    updateScheduledMovie,
    isMovieScheduled,
    getScheduledMovie,
  } = useScheduledMoviesDatabase();

  const { scheduleMovie, unscheduleMovie } = useCalendarIntegration();

  const scheduleButtonText = useMemo(() => {
    if (isMovieScheduledForUser) {
      return 'Desagendar';
    }
    return 'Agendar';
  }, [isMovieScheduledForUser]);

  const scheduleButtonIcon = useMemo((): keyof typeof MaterialCommunityIcons.glyphMap => {
    return isMovieScheduledForUser ? 'calendar-remove' : 'calendar-plus';
  }, [isMovieScheduledForUser]);

  const handleUnscheduleMovie = useCallback(
    async (movieId: number) => {
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
    },
    [getScheduledMovie, unscheduleMovie, removeScheduledMovie]
  );

  const handleConfirmSchedule = useCallback(
    async (date: Date, time: string) => {
      if (!movie) return;

      try {
        const scheduledDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

        // Criar filme agendado no banco local
        const scheduledMovie = await addScheduledMovie({
          tmdb_id: Number(movie.id),
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
    [addScheduledMovie, movie, scheduleMovie, updateScheduledMovie]
  );

  // Check if movie is scheduled
  useEffect(() => {
    const checkScheduledStatus = async () => {
      try {
        const isScheduled = await isMovieScheduled(movie.id);
        const scheduled = await getScheduledMovie(movie.id);
        setIsMovieScheduledForUser(isScheduled);
        setScheduledMovie(scheduled);
      } catch (error) {
        console.error('Error checking scheduled status:', error);
      }
    };

    if (movie) {
      checkScheduledStatus();
    }
  }, [movie, isMovieScheduled, getScheduledMovie]);

  return {
    handleUnscheduleMovie,
    handleConfirmSchedule,

    scheduleButtonText,
    scheduleButtonIcon,
    isMovieScheduledForUser,
    isMovieScheduled: isMovieScheduledForUser,
    scheduledMovie,
  };
}
