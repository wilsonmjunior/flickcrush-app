import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGetMovieDetails } from '@/core/api/queries';
import { useScheduleMovie } from '@/features/schedule/hooks';
import { Button, Header, Text } from '@/shared/components/ui';
import {
    canScheduleDateTime,
    formatDateToBrazilian,
    formatTimeToBrazilian,
    formatTimeToString,
} from '@/shared/utils';

export default function ScheduleMovieScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const router = useRouter();

  const { movie: movieId } = useLocalSearchParams<{ movie: string }>();

  const { theme } = useUnistyles();

  const { data: movie } = useGetMovieDetails(Number(movieId));
  const { handleConfirmSchedule } = useScheduleMovie(movie!);

  const handleDateChange = (_, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (_, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const canSchedule = canScheduleDateTime(selectedDate, selectedTime);

  return (
    <View style={styles.container}>
      <Header>
        <Header.BackButton />
        <Header.Title>Agendar Filme</Header.Title>
        <Header.ActionButton />
      </Header>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text variant="body" size="md" color="muted">
            {movie?.title}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="heading" size="md">
            Data
          </Text>
          <Button
            variant="outline"
            type="secondary"
            size="lg"
            onPress={() => setShowDatePicker(true)}
          >
            <Button.Icon>
              <MaterialCommunityIcons name="calendar" size={18} color={theme.colors.muted} />
            </Button.Icon>
            <Button.Label>{formatDateToBrazilian(selectedDate)}</Button.Label>
          </Button>
        </View>

        <View style={styles.section}>
          <Text variant="heading" size="md">
            Horário
          </Text>
          <Button
            variant="outline"
            type="secondary"
            size="lg"
            onPress={() => setShowTimePicker(true)}
          >
            <Button.Icon>
              <MaterialCommunityIcons name="clock" size={18} color={theme.colors.muted} />
            </Button.Icon>
            <Button.Label>{formatTimeToBrazilian(selectedTime)}</Button.Label>
          </Button>
        </View>

        {!canSchedule && (
          <View style={styles.section}>
            <Text variant="body" size="sm" color="danger">
              Não é possível agendar para uma data/horário no passado
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button variant="outline" type="secondary" size="lg" onPress={() => router.back()}>
          <Button.Label>Cancelar</Button.Label>
        </Button>
        <Button
          size="lg"
          loading={!canSchedule}
          onPress={() => handleConfirmSchedule(selectedDate, formatTimeToString(selectedTime))}
          disabled={!canSchedule}
        >
          <Button.Label>Agendar</Button.Label>
        </Button>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
  },
}));
