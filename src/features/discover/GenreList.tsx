import { FlatList, View } from 'react-native';

import { MovieGenreSchemaType } from '@/core/api/schemas/MovieGenreScheme';
import { Button } from '@/shared/components/ui';

type GenreListProps = {
  data: MovieGenreSchemaType[];
};

export function GenreList({ data }: GenreListProps) {
  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button variant="outline" color="shape">
            <Button.Label>{item.name}</Button.Label>
          </Button>
        )}
        contentContainerStyle={{ gap: 8 }}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}
