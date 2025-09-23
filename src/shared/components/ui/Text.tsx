import React from 'react';
import { Text as RNText } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ColorToken, SizeToken, TextToken } from '@/core/theme';

export type TextProps = {
  variant?: TextToken;
  size?: SizeToken;
  color?: ColorToken;
  align?: 'center' | 'left' | 'right';
  numberOfLines?: number;
  children: React.ReactNode;
};

export function Text({
  variant = 'body',
  size = 'md',
  color = 'shape',
  align = 'left',
  numberOfLines,
  children,
  ...props
}: TextProps) {
  styles.useVariants({ variant, size });

  const { theme } = useUnistyles();

  return (
    <RNText
      style={[styles.text, { textAlign: align, color: theme.colors[color] }]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create((theme) => ({
  text: {
    fontWeight: '400',

    variants: {
      variant: {
        heading: {
          fontWeight: '600',
        },
        caption: {
          fontWeight: '400',
        },
        body: {
          fontWeight: '400',
        },
      },
      size: {
        xs: {
          fontSize: theme.sizes.xs,
          lineHeight: theme.sizes.xs * 1.4,
        },
        sm: {
          fontSize: theme.sizes.sm,
          lineHeight: theme.sizes.sm * 1.4,
        },
        md: {
          fontSize: theme.sizes.md,
          lineHeight: theme.sizes.md * 1.4,
        },
        lg: {
          fontSize: theme.sizes.lg,
          lineHeight: theme.sizes.lg * 1.4,
        },
        xl: {
          fontSize: theme.sizes.xl,
          lineHeight: theme.sizes.xl * 1.4,
        },
      },
    },

    compoundVariants: [
      {
        variant: 'heading',
        size: 'xs',
        styles: {
          lineHeight: theme.sizes.xs * 1.2,
        },
      },
      {
        variant: 'heading',
        size: 'sm',
        styles: {
          lineHeight: theme.sizes.sm * 1.2,
        },
      },
      {
        variant: 'heading',
        size: 'md',
        styles: {
          lineHeight: theme.sizes.md * 1.2,
        },
      },
      {
        variant: 'heading',
        size: 'lg',
        styles: {
          lineHeight: theme.sizes.lg * 1.2,
        },
      },
      {
        variant: 'heading',
        size: 'xl',
        styles: {
          lineHeight: theme.sizes.xl * 1.2,
        },
      },
      {
        variant: 'caption',
        size: 'xs',
        styles: {
          lineHeight: theme.sizes.xs * 1.3,
        },
      },
      {
        variant: 'caption',
        size: 'sm',
        styles: {
          lineHeight: theme.sizes.sm * 1.3,
        },
      },
      {
        variant: 'caption',
        size: 'md',
        styles: {
          lineHeight: theme.sizes.md * 1.3,
        },
      },
      {
        variant: 'caption',
        size: 'lg',
        styles: {
          lineHeight: theme.sizes.lg * 1.3,
        },
      },
      {
        variant: 'caption',
        size: 'xl',
        styles: {
          lineHeight: theme.sizes.xl * 1.3,
        },
      },
    ],
  },
}));
