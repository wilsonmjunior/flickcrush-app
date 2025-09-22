import { Dimensions, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Skeleton } from '../../ui/Skeleton';

const { width: screenWidth } = Dimensions.get('window');

export function SearchMoviesSkeleton() {
  const { theme } = useUnistyles();

  return (
    <Skeleton>
      <View style={styles.container}>
        {/* Movie List Skeleton */}
        <Skeleton.List>
          {Array.from({ length: 3 }).map((_, index) => (
            <View key={index} style={styles.movieCard}>
              <Skeleton.Row gap={theme.spacing.md}>
                {/* Movie Poster Skeleton */}
                <Skeleton.Box
                  width={screenWidth * 0.3}
                  height={screenWidth * 0.3 * 1.5}
                  borderRadius={8}
                />

                {/* Movie Details Skeleton */}
                <Skeleton.Group style={styles.movieDetails}>
                  {/* Title */}
                  <Skeleton.Text width="80%" height={20} />

                  {/* Rating and Date Row */}
                  <Skeleton.Row gap={theme.spacing.sm}>
                    <Skeleton.Circle size={16} />
                    <Skeleton.Text width={30} height={14} />
                    <Skeleton.Text width={60} height={14} />
                  </Skeleton.Row>

                  {/* Description */}
                  <Skeleton.Text width="100%" height={14} />
                  <Skeleton.Text width="90%" height={14} />
                  <Skeleton.Text width="70%" height={14} />

                  {/* Action Buttons */}
                  <Skeleton.Row gap={theme.spacing.lg}>
                    <Skeleton.Row gap={theme.spacing.xs}>
                      <Skeleton.Circle size={20} />
                      <Skeleton.Text width={60} height={14} />
                    </Skeleton.Row>
                    <Skeleton.Row gap={theme.spacing.xs}>
                      <Skeleton.Circle size={20} />
                      <Skeleton.Text width={60} height={14} />
                    </Skeleton.Row>
                  </Skeleton.Row>
                </Skeleton.Group>
              </Skeleton.Row>
            </View>
          ))}
        </Skeleton.List>
      </View>
    </Skeleton>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.xl,
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  movieCard: {
    paddingVertical: theme.spacing.md,
  },
  movieDetails: {
    flex: 1,
    gap: theme.spacing.sm,
  },
}));
