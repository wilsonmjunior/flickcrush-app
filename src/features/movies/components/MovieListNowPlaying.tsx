import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@/shared/components/ui';
import { MovieCard } from './MovieCard';

type MovieListNowPlayingProps = {
  data: any;
};

export function MovieListNowPlaying({ data }: MovieListNowPlayingProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant="heading" size="lg">
          Em cartaz
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <MovieCard movie={item} size="md" onPress={() => router.push(`/movie/${item.id}`)} />
        )}
        horizontal
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: theme.spacing['3xl'],
  },
  textContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  listContent: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  list: {
    paddingHorizontal: theme.spacing.xl,
  },
}));
