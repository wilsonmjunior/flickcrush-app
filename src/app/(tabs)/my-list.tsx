import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { useGetFavoriteMovies, useGetWatchedMovies } from '@/api/queries';
import { MovieGridSkeleton } from '@/components/features/movies/MovieGridSkeleton';
import { Button, Card, Header } from '@/components/ui';

const listCategories = {
  WANT_TO_WATCH: {
    title: 'Quero assistir',
    icon: 'eye-check-outline',
  },
  WATCHED: {
    title: 'Assistido',
    icon: 'eye-check-outline',
  },
};

export default function MyListScreen() {
  const [selectedCategory, setSelectedCategory] = useState(listCategories.WANT_TO_WATCH);

  const router = useRouter();

  const {
    data: favoriteMovies,
    isLoading: isLoadingFavoriteMovies,
    refetch: refetchFavoriteMovies,
  } = useGetFavoriteMovies();
  const {
    data: watchedMovies,
    isLoading: isLoadingWatchedMovies,
    refetch: refetchWatchedMovies,
  } = useGetWatchedMovies();

  // Refetch data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetchWatchedMovies();
      refetchFavoriteMovies();
    }, [refetchWatchedMovies, refetchFavoriteMovies])
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <Header>
        <Header.Title>Minha Lista</Header.Title>
      </Header>

      <View style={styles.categoriesContainer}>
        <View style={{ flex: 1 }}>
          <Button
            variant="outline"
            type={selectedCategory === listCategories.WANT_TO_WATCH ? 'primary' : 'secondary'}
            onPress={() => setSelectedCategory(listCategories.WANT_TO_WATCH)}
          >
            <Button.Label>{listCategories.WANT_TO_WATCH.title}</Button.Label>
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            variant="outline"
            type={selectedCategory === listCategories.WATCHED ? 'primary' : 'secondary'}
            onPress={() => setSelectedCategory(listCategories.WATCHED)}
          >
            <Button.Label>{listCategories.WATCHED.title}</Button.Label>
          </Button>
        </View>
      </View>

      {(isLoadingFavoriteMovies || isLoadingWatchedMovies) && <MovieGridSkeleton />}

      {selectedCategory === listCategories.WATCHED ? (
        <FlatList
          data={watchedMovies}
          keyExtractor={(item) => item.tmdb_id.toString()}
          renderItem={({ item }) => (
            <Card onPress={() => router.push(`/movie/${item.tmdb_id}`)}>
              <Card.Image uri={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
            </Card>
          )}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.tmdb_id.toString()}
          renderItem={({ item }) => (
            <Card onPress={() => router.push(`/movie/${item.tmdb_id}`)}>
              <Card.Image uri={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
            </Card>
          )}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
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
  categoriesContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.xl,
  },
  listContent: {
    marginTop: theme.spacing.xl,
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  columnWrapper: {
    gap: theme.spacing.md,
    justifyContent: 'flex-start',
  },
}));
