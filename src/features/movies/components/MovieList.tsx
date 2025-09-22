import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { MovieCard } from '@/features/movies/components';
import { Button, Text } from '@/shared/components/ui';

type MovieListProps<T> = {
  data: T & { id: number }[];
  title: string;
  onPress: () => void;
};

export function MovieList<T>({ data, title, onPress }: MovieListProps<T>) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text variant="heading" size="lg">
          {title}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      <View style={styles.buttonContainer}>
        <Button variant="ghost" color="shape" size="sm" onPress={onPress}>
          <Button.Label>Ver todos</Button.Label>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  textContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  listContent: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  list: {
    paddingHorizontal: theme.spacing.xl,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
}));
