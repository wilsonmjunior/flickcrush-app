import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { useGetLatestMovies, useGetPopularMovies, useGetUpcomingMovies } from '@/api/queries';
import { Loading } from '@/components';
import { MovieBrowserCard } from '@/components/features/movies';
import { Header } from '@/components/ui';

export default function MovieCategoryScreen() {
  const { category } = useLocalSearchParams();

  const {
    data: upcomingDataMovies,
    hasNextPage: hasNextPageUpcoming,
    fetchNextPage: fetchNextPageUpcoming,
    isFetchingNextPage: isFetchingNextPageUpcoming,
  } = useGetUpcomingMovies(category === 'upcoming');
  const {
    data: latestDataMovies,
    hasNextPage: hasNextPageLatest,
    fetchNextPage: fetchNextPageLatest,
    isFetchingNextPage: isFetchingNextPageLatest,
  } = useGetLatestMovies(category === 'latest');
  const {
    data: popularDataMovies,
    hasNextPage: hasNextPagePopular,
    fetchNextPage: fetchNextPagePopular,
    isFetchingNextPage: isFetchingNextPagePopular,
  } = useGetPopularMovies(category === 'popular');

  const movies = useMemo(() => {
    switch (category) {
      case 'upcoming':
        return upcomingDataMovies?.pages.flatMap((page) => page.results) || [];
      case 'latest':
        return latestDataMovies?.pages.flatMap((page) => page.results) || [];
      case 'popular':
        return popularDataMovies?.pages.flatMap((page) => page.results) || [];
    }
  }, [category, upcomingDataMovies, latestDataMovies, popularDataMovies]);

  const hasNextPage = useMemo(() => {
    switch (category) {
      case 'upcoming':
        return hasNextPageUpcoming;
      case 'latest':
        return hasNextPageLatest;
      case 'popular':
        return hasNextPagePopular;
    }
  }, [category, hasNextPageUpcoming, hasNextPageLatest, hasNextPagePopular]);

  const onNextPage = useMemo(() => {
    switch (category) {
      case 'upcoming':
        return fetchNextPageUpcoming;
      case 'latest':
        return fetchNextPageLatest;
      case 'popular':
        return fetchNextPagePopular;
    }
  }, [category, fetchNextPageUpcoming, fetchNextPageLatest, fetchNextPagePopular]);

  const isFetchingNextPage = useMemo(() => {
    switch (category) {
      case 'upcoming':
        return isFetchingNextPageUpcoming;
      case 'latest':
        return isFetchingNextPageLatest;
      case 'popular':
        return isFetchingNextPagePopular;
    }
  }, [category, isFetchingNextPageUpcoming, isFetchingNextPageLatest, isFetchingNextPagePopular]);

  const title = useMemo(() => {
    switch (category) {
      case 'upcoming':
        return 'Lançamentos';
      case 'latest':
        return 'Ultimos lançamentos';
      case 'popular':
        return 'Populares';
    }
  }, [category]);

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <Header.BackButton />
        <Header.Title>{title}</Header.Title>
        <Header.ActionButton />
      </Header>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieBrowserCard movie={item} />}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage) {
            onNextPage?.();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isFetchingNextPage ? <Loading text="Carregando mais filmes..." /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    marginHorizontal: theme.spacing.xl,
  },
  listContent: {
    gap: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
}));
