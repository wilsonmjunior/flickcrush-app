import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUnistyles } from 'react-native-unistyles';

import { useGetIsFavoriteMovie, useGetIsWatchedMovie } from '@/core/api/queries';
import { MovieSchemaType } from '@/core/api/schemas';
import { useFavoriteMovie } from '@/features/favorites/hooks';
import { useWatchedMovie } from '@/features/watched/hooks';
import { Button, Card } from '@/shared/components/ui';
import { getFullYear } from '@/shared/utils';

type MovieBrowserCardProps = {
  movie: MovieSchemaType;
};

export function MovieBrowserCard({ movie }: MovieBrowserCardProps) {
  const { theme } = useUnistyles();

  const router = useRouter();

  const { data: isFavoriteMovie } = useGetIsFavoriteMovie(movie.id);
  const { data: isWatchedMovie } = useGetIsWatchedMovie(movie.id);

  const { handleFavorite, favoriteIcon } = useFavoriteMovie(isFavoriteMovie ?? false);
  const { handleWatched, watchedIcon } = useWatchedMovie(isWatchedMovie ?? false);

  return (
    <Card onPress={() => router.push(`/movie/${movie.id}`)}>
      <Card.Row>
        <Card.Image uri={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />

        <Card.Column>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Row>
            <MaterialCommunityIcons name="star" size={16} color={theme.colors.warning} />
            <Card.Description>{movie.vote_average.toFixed(1)}</Card.Description>
            <Card.Description>{getFullYear(movie.release_date)}</Card.Description>
          </Card.Row>

          <Card.Row>
            <Card.Description>{movie.overview?.slice(0, 80)}...</Card.Description>
          </Card.Row>

          <Card.Row>
            <Button>
              <Button.Icon>
                <MaterialCommunityIcons
                  name="calendar-outline"
                  size={24}
                  color={theme.colors.surface}
                />
              </Button.Icon>
            </Button>

            <Button variant="outline" onPress={() => handleWatched(movie)}>
              <Button.Icon>
                <MaterialCommunityIcons name={watchedIcon} size={24} color={theme.colors.primary} />
              </Button.Icon>
            </Button>
            <Button variant="outline" onPress={() => handleFavorite(movie)}>
              <Button.Icon>
                <MaterialCommunityIcons
                  name={favoriteIcon}
                  size={24}
                  color={theme.colors.primary}
                />
              </Button.Icon>
            </Button>
          </Card.Row>
        </Card.Column>
      </Card.Row>
    </Card>
  );
}
