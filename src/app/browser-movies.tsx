import { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useSearchMovies } from '@/core/api/queries';
import { MovieBrowserCard } from '@/features/movies/components';
import { SearchHeader, SearchMoviesSkeleton } from '@/features/search/components';
import { useDebounce } from '@/shared/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrowserMoviesScreen() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500); // Debounce de 500ms

  const { data: searchData, isLoading, refetch } = useSearchMovies(debouncedSearch);

  const movies = useMemo(
    () => searchData?.pages.flatMap((page) => page.results) || [],
    [searchData]
  );

  const handleSearch = useCallback((search: string) => {
    setSearch(search);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader search={search} onSearch={handleSearch} />

      {isLoading ? (
        <SearchMoviesSkeleton />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieBrowserCard movie={item} />}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshing={isLoading}
          onRefresh={() => refetch()}
        />
      )}
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
  },
}));
