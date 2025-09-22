import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View, ViewProps } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { TextToken } from '@/core/theme';
import { ButtonProps } from '.';
import { Text, TextProps } from './Text';

type HeaderRootProps = ViewProps & {
  variant?: 'primary' | 'ghost';
};

function Header({ variant = 'primary', ...props }: HeaderRootProps) {
  styles.useVariants({
    variant,
  });

  return (
    <View
      {...props}
      style={[
        styles.container,
        props.children && Array.isArray(props.children) && props.children.length > 1
          ? {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }
          : null,
      ]}
    />
  );
}

type HeaderActionButtonProps = Omit<ButtonProps, 'variant' | 'children'> & {
  children?: React.ReactNode;
};

const HeaderActionButton = memo(({ children, onPress }: HeaderActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessible
      accessibilityRole="button"
      style={styles.actionButton}
    >
      {children}
    </TouchableOpacity>
  );
});

HeaderActionButton.displayName = 'HeaderActionButton';

type HeaderBackButtonProps = Omit<HeaderActionButtonProps, 'children'>;

const HeaderBackButton = memo(({ color = 'text', ...props }: HeaderBackButtonProps) => {
  const { theme } = useUnistyles();
  const { canGoBack, back } = useRouter();

  const handleGoBack = useCallback(() => {
    if (!canGoBack) return;

    back();
  }, [back, canGoBack]);

  return (
    <HeaderActionButton onPress={handleGoBack} {...props}>
      <Feather name="chevron-left" size={24} color={theme.colors[color]} />
    </HeaderActionButton>
  );
});

HeaderBackButton.displayName = 'HeaderBackButton';

type HeaderTitleProps = Omit<TextProps, 'variant'> & {
  variant?: TextToken;
};

const HeaderTitle = memo(({ variant, ...props }: HeaderTitleProps) => {
  return (
    <Text {...props} variant="heading" align="center">
      {props.children}
    </Text>
  );
});

HeaderTitle.displayName = 'HeaderTitle';

Header.ActionButton = HeaderActionButton;
Header.BackButton = HeaderBackButton;
Header.Title = HeaderTitle;

const styles = StyleSheet.create((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,

    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.background,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        },
      },
    },
  },

  actionButton: {
    width: theme.spacing['4xl'],
    height: theme.spacing['4xl'],
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
  },

  actionPlaceholder: {
    width: theme.spacing['4xl'],
    height: theme.spacing['4xl'],
  },
}));

export { Header };
