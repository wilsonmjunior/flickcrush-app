import { Image } from 'expo-image';
import { memo, useCallback, useMemo } from 'react';
import { FlatList, Linking, TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { MovieVideoItemType } from '@/models/MovieVideoSchema';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '../../ui';

type MovieTrailerItemProps = { item: MovieVideoItemType };

const MovieTrailerItem = memo(({ item }: MovieTrailerItemProps) => {
  const { theme } = useUnistyles();

  const thumbnailUrl = useMemo(
    () => `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`,
    [item.key]
  );

  const handleOpenYoutube = useCallback((key: string) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    Linking.openURL(url);
  }, []);

  return (
    <TouchableOpacity style={styles.trailerContainer} onPress={() => handleOpenYoutube(item.key)}>
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.overlay}>
        <MaterialIcons name="play-arrow" size={24} color={theme.colors.white} />
      </View>

      <View style={styles.trailerTitleContainer}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
});

MovieTrailerItem.displayName = 'MovieTrailerItem';

type MovieListTrailersProps = {
  videos: MovieVideoItemType[];
};

export function MovieListTrailers({ videos }: MovieListTrailersProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="heading" size="lg">
          Trailers
        </Text>
      </View>

      <FlatList
        data={videos}
        renderItem={({ item }) => <MovieTrailerItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.md,
  },
  titleContainer: {
    paddingHorizontal: theme.spacing.xl,
  },
  trailerContainer: {
    marginRight: 15,
    width: 300,
  },
  thumbnail: {
    width: 300,
    height: 169, // Proporção 16:9
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: theme.radius.md,
  },
  trailerTitleContainer: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.muted + '20',
    borderBottomLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
  },
  listContent: {
    paddingHorizontal: theme.spacing.xl,
  },
}));
