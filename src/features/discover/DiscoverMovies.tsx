import { useRouter } from 'expo-router';
import { FlatList, View } from 'react-native';

import { MovieSchemaType } from '@/core/api/schemas';
import { MovieCard } from '@/features/movies/components';
import { Loading } from '@/shared/components/common';

type DiscoverMoviesProps = {
  data: MovieSchemaType[];
  hasNextPage: boolean;
  onNextPage: () => void;
  isFetchingNextPage: boolean;
};

export function DiscoverMovies({
  data,
  hasNextPage,
  onNextPage,
  isFetchingNextPage,
}: DiscoverMoviesProps) {
  const router = useRouter();

  return (
    <View style={{ flex: 1, marginTop: 24, alignItems: 'center' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard size="md" movie={item} onPress={() => router.push(`/movie/${item.id}`)} />
        )}
        onEndReached={() => {
          if (hasNextPage) {
            onNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() =>
          isFetchingNextPage ? <Loading text="Carregando mais filmes..." /> : null
        }
      />
    </View>
  );
}
