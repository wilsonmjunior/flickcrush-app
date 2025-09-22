import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import {
  useGetLatestMovies,
  useGetNowPlayingMovies,
  useGetPopularMovies,
  useGetUpcomingMovies,
} from '@/api/queries';
import { MovieList, MovieListNowPlaying } from '@/components';

export default function HomeScreen() {
  const router = useRouter();

  const { data: upcomingDataMovies } = useGetUpcomingMovies();
  const { data: latestDataMovies } = useGetLatestMovies();
  const { data: popularDataMovies } = useGetPopularMovies();
  const { data: nowPlayingDataMovies } = useGetNowPlayingMovies();

  const upcomingMovies = useMemo(
    () => upcomingDataMovies?.pages.flatMap((page) => page.results) || [],
    [upcomingDataMovies]
  );

  const latestMovies = useMemo(
    () => latestDataMovies?.pages.flatMap((page) => page.results) || [],
    [latestDataMovies]
  );

  const popularMovies = useMemo(
    () => popularDataMovies?.pages.flatMap((page) => page.results) || [],
    [popularDataMovies]
  );

  const nowPlayingMovies = useMemo(
    () => nowPlayingDataMovies?.pages.flatMap((page) => page.results) || [],
    [nowPlayingDataMovies]
  );

  return (
    <ScrollView style={styles.container}>
      <MovieListNowPlaying data={nowPlayingMovies} />

      <View style={styles.content}>
        <MovieList
          data={upcomingMovies}
          title="Próximos lançamentos"
          onPress={() => router.push('/upcoming')}
        />
        <MovieList data={popularMovies} title="Populares" onPress={() => router.push('/popular')} />
        <MovieList
          data={latestMovies}
          title="Ultimos lançamentos"
          onPress={() => router.push('/latest')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    marginTop: theme.spacing.xl,
  },
  listContent: {
    paddingVertical: theme.spacing['2xl'],
    gap: theme.spacing.lg,
  },
}));
