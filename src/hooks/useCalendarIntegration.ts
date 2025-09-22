import * as Calendar from 'expo-calendar';
import * as Notifications from 'expo-notifications';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { ScheduledMovie } from '@/models/ScheduledMovieSchema';

// Configurar notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useCalendarIntegration() {
  // Solicitar permissões
  const requestPermissions = useCallback(async () => {
    try {
      // Solicitar permissão para calendário
      const calendarStatus = await Calendar.requestCalendarPermissionsAsync();
      if (calendarStatus.status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir acesso ao calendário para agendar filmes.'
        );
        return false;
      }

      // Solicitar permissão para notificações
      const notificationStatus = await Notifications.requestPermissionsAsync();
      if (notificationStatus.status !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'É necessário permitir notificações para receber lembretes dos filmes agendados.'
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao solicitar permissões',
      });
      return false;
    }
  }, []);

  // Criar evento no calendário
  const createCalendarEvent = useCallback(
    async (scheduledMovie: ScheduledMovie) => {
      try {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return null;

        // Obter calendários disponíveis
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendar = calendars.find((cal) => cal.isPrimary) || calendars[0];

        if (!defaultCalendar) {
          throw new Error('Nenhum calendário encontrado');
        }

        // Criar data/hora do evento
        const eventDate = new Date(scheduledMovie.scheduled_date);
        const [hours, minutes] = scheduledMovie.scheduled_time.split(':');
        eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // Criar evento
        const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
          title: `🎬 ${scheduledMovie.title}`,
          startDate: eventDate,
          endDate: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000), // 2 horas de duração
          notes: `Filme agendado via FlickCrush\n\nTítulo: ${scheduledMovie.title}\nData: ${scheduledMovie.scheduled_date}\nHorário: ${scheduledMovie.scheduled_time}`,
          location: 'Casa',
          alarms: [
            {
              relativeOffset: -30, // 30 minutos antes
              method: Calendar.AlarmMethod.ALERT,
            },
            {
              relativeOffset: -60, // 1 hora antes
              method: Calendar.AlarmMethod.ALERT,
            },
          ],
        });

        return eventId;
      } catch (error) {
        console.error('Error creating calendar event:', error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar evento no calendário',
        });
        return null;
      }
    },
    [requestPermissions]
  );

  // Criar notificação
  const createNotification = useCallback(
    async (scheduledMovie: ScheduledMovie) => {
      try {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return null;

        // Criar data/hora da notificação
        const notificationDate = new Date(scheduledMovie.scheduled_date);
        const [hours, minutes] = scheduledMovie.scheduled_time.split(':');
        notificationDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // Agendar notificação
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: '🎬 Hora do Filme!',
            body: `${scheduledMovie.title} está agendado para agora!`,
            data: {
              movieId: scheduledMovie.tmdb_id,
              scheduledMovieId: scheduledMovie.id,
            },
          },
          trigger: {
            type: 'date',
            date: notificationDate,
          },
        });

        return notificationId;
      } catch (error) {
        console.error('Error creating notification:', error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao criar notificação',
        });
        return null;
      }
    },
    [requestPermissions]
  );

  // Remover evento do calendário
  const removeCalendarEvent = useCallback(async (eventId: string) => {
    try {
      await Calendar.deleteEventAsync(eventId);
    } catch (error) {
      console.error('Error removing calendar event:', error);
    }
  }, []);

  // Cancelar notificação
  const cancelNotification = useCallback(async (notificationId: string) => {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
    }
  }, []);

  // Agendar filme (criar evento + notificação)
  const scheduleMovie = useCallback(
    async (scheduledMovie: ScheduledMovie) => {
      try {
        const [eventId, notificationId] = await Promise.all([
          createCalendarEvent(scheduledMovie),
          createNotification(scheduledMovie),
        ]);

        return { eventId, notificationId };
      } catch (error) {
        console.error('Error scheduling movie:', error);
        throw error;
      }
    },
    [createCalendarEvent, createNotification]
  );

  // Desagendar filme (remover evento + notificação)
  const unscheduleMovie = useCallback(
    async (scheduledMovie: ScheduledMovie) => {
      try {
        const promises = [];

        if (scheduledMovie.calendar_event_id) {
          promises.push(removeCalendarEvent(scheduledMovie.calendar_event_id));
        }

        if (scheduledMovie.notification_id) {
          promises.push(cancelNotification(scheduledMovie.notification_id));
        }

        await Promise.all(promises);
      } catch (error) {
        console.error('Error unscheduling movie:', error);
        throw error;
      }
    },
    [removeCalendarEvent, cancelNotification]
  );

  return {
    requestPermissions,
    createCalendarEvent,
    createNotification,
    removeCalendarEvent,
    cancelNotification,
    scheduleMovie,
    unscheduleMovie,
  };
}
