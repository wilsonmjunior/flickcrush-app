import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Button, Text } from '@/shared/components/ui';
import {
  canScheduleDateTime,
  formatDateToBrazilian,
  formatTimeToBrazilian,
  formatTimeToString,
} from '@/shared/utils';

interface ScheduleMovieModalProps {
  visible: boolean;
  onClose: () => void;
  onSchedule: (date: Date, time: string) => void;
  movieTitle: string;
}

export function ScheduleMovieModal({
  visible,
  onClose,
  onSchedule,
  movieTitle,
}: ScheduleMovieModalProps) {
  const { theme } = useUnistyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const handleSchedule = () => {
    const timeString = formatTimeToString(selectedTime);
    onSchedule(selectedDate, timeString);
    onClose();
  };

  const canSchedule = canScheduleDateTime(selectedDate, selectedTime);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: theme.colors.background }]}>
          <View style={styles.header}>
            <Text variant="heading" size="lg">
              Agendar Filme
            </Text>
            <Button variant="ghost" type="secondary" size="sm" onPress={onClose}>
              <Button.Icon>
                <MaterialCommunityIcons name="close" size={24} color={theme.colors.text} />
              </Button.Icon>
            </Button>
          </View>

          <View style={styles.content}>
            <Text variant="body" size="md" color="muted">
              {movieTitle}
            </Text>

            <View style={styles.section}>
              <Text variant="heading" size="md">
                Data
              </Text>
              <Button
                variant="outline"
                type="primary"
                size="lg"
                onPress={() => setShowDatePicker(true)}
              >
                <Button.Icon>
                  <MaterialCommunityIcons name="calendar" size={20} color={theme.colors.shape} />
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
                type="primary"
                size="lg"
                onPress={() => setShowTimePicker(true)}
              >
                <Button.Icon>
                  <MaterialCommunityIcons name="clock" size={20} color={theme.colors.shape} />
                </Button.Icon>
                <Button.Label>{formatTimeToBrazilian(selectedTime)}</Button.Label>
              </Button>
            </View>

            {!canSchedule && (
              <Text variant="body" size="sm" color="danger">
                Não é possível agendar para uma data/horário no passado
              </Text>
            )}
          </View>

          <View style={styles.footer}>
            <Button variant="outline" type="secondary" size="lg" onPress={onClose}>
              <Button.Label>Cancelar</Button.Label>
            </Button>
            <Button
              variant="filled"
              type="primary"
              size="lg"
              loading={!canSchedule}
              onPress={handleSchedule}
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create((theme) => ({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  content: {
    gap: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
}));
