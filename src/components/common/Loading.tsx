import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text } from '../ui/Text';

export type LoadingProps = {
  size?: 'small' | 'large';
  text?: string;
  color?: string;
};

export function Loading({ size = 'small', text, color }: LoadingProps) {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color || theme.colors.primary} />
      {text && (
        <Text variant="body" size="sm" color="muted" align="center">
          {text}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  text: {
    textAlign: 'center',
  },
}));
