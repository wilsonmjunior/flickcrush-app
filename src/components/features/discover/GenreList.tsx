import { FlatList, View } from 'react-native';

import { MovieGenreSchemaType } from '@/models/MovieGenreScheme';
import { Button } from '../../ui';

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
