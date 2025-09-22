import { Dimensions } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Skeleton } from '@/shared/components/ui';

const { width: screenWidth } = Dimensions.get('window');

export function MovieListSkeleton() {
  const { theme } = useUnistyles();

  return (
    <Skeleton>
      <Skeleton.List style={styles.container}>
        <Skeleton.Row gap={theme.spacing.md}>
          <Skeleton.Box
            width={screenWidth * 0.3}
            height={screenWidth * 0.3 * 1.5}
            borderRadius={8}
          />
          <Skeleton.Box
            width={screenWidth * 0.3}
            height={screenWidth * 0.3 * 1.5}
            borderRadius={8}
          />
          <Skeleton.Box
            width={screenWidth * 0.3}
            height={screenWidth * 0.3 * 1.5}
            borderRadius={8}
          />
        </Skeleton.Row>
      </Skeleton.List>
    </Skeleton>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
