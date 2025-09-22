import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Loading } from '@/components';
import { Card, Header, Text } from '@/components/ui';
import { useScheduledMovies } from '@/hooks/useScheduledMovies';
import { formatDateToBrazilian, formatTimeToBrazilian } from '@/utils';

export default function ScheduleScreen() {
  const { theme } = useUnistyles();
  const router = useRouter();
  const { data: scheduledMovies, isLoading, refetch, isRefetching } = useScheduledMovies();

  const handleMoviePress = (tmdbId: number) => {
    router.push(`/movie/${tmdbId}`);
  };

  const renderScheduledMovie = ({ item }: { item: any }) => {
    const scheduledDate = new Date(item.scheduled_date);
    const formattedDate = formatDateToBrazilian(scheduledDate);
    const formattedTime = formatTimeToBrazilian(new Date(`2000-01-01T${item.scheduled_time}`));

    return (
      <Card variant="outline" onPress={() => handleMoviePress(item.tmdb_id)}>
        <Card.Row>
          <Card.Image
            uri={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            size="sm"
          />
          <Card.Column>
            <Card.Title numberOfLines={2}>{item.title}</Card.Title>
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTimeItem}>
                <MaterialCommunityIcons name="calendar" size={16} color={theme.colors.primary} />
                <Text variant="body" size="md" color="muted">
                  {formattedDate}
                </Text>
              </View>
              <View style={styles.dateTimeItem}>
                <MaterialCommunityIcons name="clock" size={16} color={theme.colors.primary} />
                <Text variant="body" size="md" color="muted">
                  {formattedTime}
                </Text>
              </View>
            </View>
          </Card.Column>
        </Card.Row>
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name="calendar-clock" size={64} color={theme.colors.muted} />
      <Text variant="heading" size="lg" color="muted" align="center">
        Nenhum filme agendado
      </Text>
      <Text variant="body" size="md" color="muted" align="center">
        Agende seus filmes favoritos para assistir em uma data e horário específicos
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
        <Header>
          <Header.Title>Agendamentos</Header.Title>
        </Header>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.container}>
      <Header>
        <Header.Title>Agendados</Header.Title>
      </Header>

      <FlatList
        data={scheduledMovies || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderScheduledMovie}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: theme.spacing.lg,
    flexGrow: 1,
  },
  separator: {
    height: theme.spacing.md,
  },
  dateTimeContainer: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
}));
