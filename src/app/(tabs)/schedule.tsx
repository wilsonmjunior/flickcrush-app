import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ScheduleMovieCard } from '@/features/schedule/components';
import { useScheduledMovies } from '@/features/schedule/hooks';
import { Loading } from '@/shared/components/common';
import { Header, Text } from '@/shared/components/ui';

export default function ScheduleScreen() {
  const { theme } = useUnistyles();
  const router = useRouter();
  const { data: scheduledMovies, isLoading, refetch, isRefetching } = useScheduledMovies();

  const handleMoviePress = (tmdbId: number) => {
    router.push(`/movie/${tmdbId}`);
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
        renderItem={({ item }) => (
          <ScheduleMovieCard movie={item} onPress={() => handleMoviePress(item.tmdb_id)} />
        )}
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
