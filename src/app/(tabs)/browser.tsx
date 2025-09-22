import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { useGetDiscoverMovies } from '@/api/queries';
import { DiscoverMovies } from '@/components';
import { Header } from '@/components/ui';

export default function BrowserScreen() {
  const { theme } = useUnistyles();

  const router = useRouter();

  // const { data: genresData } = useGetMovieGenres();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetDiscoverMovies();

  // const genres = useMemo(() => genresData?.genres || [], [genresData]);
  const movies = useMemo(() => data?.pages.flatMap((page) => page.results) || [], [data]);

  return (
    <View style={styles.container}>
      <Header>
        <Header.ActionButton />
        <Header.Title>Explorar</Header.Title>
        <Header.ActionButton onPress={() => router.push('/browser-movies')}>
          <MaterialIcons name="search" size={24} color={theme.colors.text} />
        </Header.ActionButton>
      </Header>

      <DiscoverMovies
        data={movies}
        hasNextPage={hasNextPage}
        onNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
}));
