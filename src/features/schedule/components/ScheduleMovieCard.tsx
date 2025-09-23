import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { useUnistyles } from 'react-native-unistyles';

import { ScheduledMovie } from '@/core/database';
import { Card, Text } from '@/shared/components/ui';
import { formatDateToBrazilian, formatTimeToBrazilian } from '@/shared/utils';

type ScheduleMovieCardProps = {
  movie: ScheduledMovie;
  onPress(): void;
};

export function ScheduleMovieCard({ movie, onPress }: ScheduleMovieCardProps) {
  const { theme } = useUnistyles();

  const scheduledDate = useMemo(() => new Date(movie.scheduled_date), [movie.scheduled_date]);
  const formattedDate = useMemo(() => formatDateToBrazilian(scheduledDate), [scheduledDate]);
  const formattedTime = useMemo(
    () => formatTimeToBrazilian(new Date(`2000-01-01T${movie.scheduled_time}`)),
    [movie.scheduled_time]
  );

  return (
    <Card variant="outline" onPress={onPress}>
      <Card.Row>
        <Card.Image
          uri={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : 'https://via.placeholder.com/200x300?text=No+Image'
          }
          size="sm"
        />
        <Card.Column>
          <Card.Title numberOfLines={2}>{movie.title}</Card.Title>
          <Card.Row>
            <Card.Column>
              <Card.Row>
                <MaterialCommunityIcons name="calendar" size={16} color={theme.colors.primary} />
                <Text variant="body" size="md" color="muted">
                  {formattedDate}
                </Text>
              </Card.Row>
            </Card.Column>
          </Card.Row>
          <Card.Row>
            <Card.Column>
              <Card.Row>
                <MaterialCommunityIcons name="clock" size={16} color={theme.colors.primary} />
                <Text variant="body" size="md" color="muted">
                  {formattedTime}
                </Text>
              </Card.Row>
            </Card.Column>
          </Card.Row>
        </Card.Column>
      </Card.Row>
    </Card>
  );
}
