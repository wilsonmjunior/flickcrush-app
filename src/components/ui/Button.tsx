import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { ColorToken, SizeToken } from '@/theme';
import { Text } from './Text';

export type ButtonProps = {
  variant?: 'outline' | 'filled' | 'ghost';
  type?: 'primary' | 'danger' | 'warning' | 'secondary';
  size?: Extract<SizeToken, 'xs' | 'sm' | 'md' | 'lg'>;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  color?: ColorToken;
};

export type ButtonIconProps = {
  children: React.ReactNode;
};

export type ButtonLabelProps = {
  children: React.ReactNode;
};

const ButtonContext = React.createContext<{
  variant: 'outline' | 'filled' | 'ghost';
  type: 'primary' | 'danger' | 'warning' | 'secondary';
  size: Extract<SizeToken, 'xs' | 'sm' | 'md' | 'lg'>;
  loading: boolean;
  disabled: boolean;
  isDisabled: boolean;
  color?: ColorToken;
}>({
  variant: 'filled',
  type: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  isDisabled: false,
});

export function Button({
  variant = 'filled',
  type = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onPress,
  children,
  color,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isLoading = loading;

  styles.useVariants({
    variant,
    type,
    size,
    isDisabled,
    isLoading,
  });

  const contextValue = {
    variant,
    type,
    size,
    loading: isLoading,
    disabled: isDisabled,
    isDisabled,
    color,
  };

  return (
    <ButtonContext.Provider value={contextValue}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        accessible
        accessibilityRole="button"
      >
        <View style={styles.content}>{children}</View>
      </TouchableOpacity>
    </ButtonContext.Provider>
  );
}

function ButtonIcon({ children }: ButtonIconProps) {
  const { loading, variant, type, isDisabled } = React.useContext(ButtonContext);
  const { theme } = useUnistyles();

  styles.useVariants({
    variant,
    type,
    isDisabled,
    isLoading: loading,
  });

  const getLoadingColor = () => {
    if (isDisabled) return theme.colors.muted;
    if (variant === 'filled') return theme.colors.white;
    switch (type) {
      case 'primary':
        return theme.colors.primary;
      case 'danger':
        return theme.colors.danger;
      case 'warning':
        return theme.colors.warning;
      case 'secondary':
        return theme.colors.muted;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <View style={styles.iconContainer}>
      {loading && <ActivityIndicator size="small" color={getLoadingColor()} />}
      {!loading && children}
    </View>
  );
}

function ButtonLabel({ children }: ButtonLabelProps) {
  const { variant, type, isDisabled } = React.useContext(ButtonContext);

  styles.useVariants({
    variant,
    type,
    isDisabled,
  });

  const getTextColor = (): ColorToken => {
    if (isDisabled) return 'muted';
    if (variant === 'filled') return 'white';
    switch (type) {
      case 'primary':
        return 'primary';
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'secondary':
        return 'muted';
      default:
        return 'primary';
    }
  };

  return (
    <Text variant="heading" color={getTextColor()}>
      {children}
    </Text>
  );
}

Button.Icon = ButtonIcon;
Button.Label = ButtonLabel;

const styles = StyleSheet.create((theme) => ({
  button: {
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
      // VARIANTS - Estilo visual
      variant: {
        filled: {
          borderWidth: 0,
        },
        outline: {
          borderWidth: 1,
        },
        ghost: {
          borderWidth: 0,
        },
      },

      // TYPES - Cores semânticas
      type: {
        primary: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        danger: {
          backgroundColor: theme.colors.danger,
          borderColor: theme.colors.danger,
        },
        warning: {
          backgroundColor: theme.colors.warning,
          borderColor: theme.colors.warning,
        },
        secondary: {
          backgroundColor: theme.colors.muted,
          borderColor: theme.colors.muted,
        },
      },

      // SIZES - Tamanhos
      size: {
        xs: {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          height: theme.spacing['2xl'],
        },
        sm: {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          height: theme.spacing['3xl'],
        },
        md: {
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          height: theme.spacing['4xl'],
        },
        lg: {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.md,
          height: theme.spacing['5xl'],
        },
      },

      // STATES - Estados
      isDisabled: {
        true: {
          opacity: 0.6,
          backgroundColor: theme.colors.muted,
          borderColor: theme.colors.muted,
        },
      },

      isLoading: {
        true: {
          // Estilos específicos para loading se necessário
        },
      },
    },

    // COMPOUND VARIANTS - Combinações específicas
    compoundVariants: [
      // FILLED variants
      {
        variant: 'filled',
        type: 'primary',
        styles: {
          backgroundColor: theme.colors.primary,
        },
      },
      {
        variant: 'filled',
        type: 'danger',
        styles: {
          backgroundColor: theme.colors.danger,
        },
      },
      {
        variant: 'filled',
        type: 'warning',
        styles: {
          backgroundColor: theme.colors.warning,
        },
      },
      {
        variant: 'filled',
        type: 'secondary',
        styles: {
          backgroundColor: theme.colors.muted,
        },
      },

      // OUTLINE variants
      {
        variant: 'outline',
        type: 'primary',
        styles: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
        },
      },
      {
        variant: 'outline',
        type: 'danger',
        styles: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.danger,
        },
      },
      {
        variant: 'outline',
        type: 'warning',
        styles: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.warning,
        },
      },
      {
        variant: 'outline',
        type: 'secondary',
        styles: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.muted,
        },
      },

      // GHOST variants
      {
        variant: 'ghost',
        type: 'primary',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        variant: 'ghost',
        type: 'danger',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        variant: 'ghost',
        type: 'warning',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        variant: 'ghost',
        type: 'secondary',
        styles: {
          backgroundColor: 'transparent',
        },
      },

      // DISABLED states
      {
        isDisabled: true,
        variant: 'filled',
        styles: {
          backgroundColor: theme.colors.muted,
        },
      },
      {
        isDisabled: true,
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
          borderColor: theme.colors.muted,
        },
      },
      {
        isDisabled: true,
        variant: 'ghost',
        styles: {
          backgroundColor: 'transparent',
        },
      },
    ],
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    fontWeight: '600',
    variants: {
      // Text color based on variant and type
      variant: {
        filled: {
          color: theme.colors.white,
        },
        outline: {
          // Color will be set by compound variants
        },
        ghost: {
          // Color will be set by compound variants
        },
      },
      type: {
        primary: {
          // Color will be set by compound variants
        },
        danger: {
          // Color will be set by compound variants
        },
        warning: {
          // Color will be set by compound variants
        },
        secondary: {
          // Color will be set by compound variants
        },
      },
      isDisabled: {
        true: {
          color: theme.colors.muted,
        },
      },
    },
    compoundVariants: [
      // OUTLINE + TYPE combinations
      {
        variant: 'outline',
        type: 'primary',
        styles: {
          color: theme.colors.primary,
        },
      },
      {
        variant: 'outline',
        type: 'danger',
        styles: {
          color: theme.colors.danger,
        },
      },
      {
        variant: 'outline',
        type: 'warning',
        styles: {
          color: theme.colors.warning,
        },
      },
      {
        variant: 'outline',
        type: 'secondary',
        styles: {
          color: theme.colors.muted,
        },
      },

      // GHOST + TYPE combinations
      {
        variant: 'ghost',
        type: 'primary',
        styles: {
          color: theme.colors.primary,
        },
      },
      {
        variant: 'ghost',
        type: 'danger',
        styles: {
          color: theme.colors.danger,
        },
      },
      {
        variant: 'ghost',
        type: 'warning',
        styles: {
          color: theme.colors.warning,
        },
      },
      {
        variant: 'ghost',
        type: 'secondary',
        styles: {
          color: theme.colors.muted,
        },
      },
    ],
  },

  loadingIndicator: {
    variants: {
      type: {
        primary: {
          color: theme.colors.white,
        },
        danger: {
          color: theme.colors.white,
        },
        warning: {
          color: theme.colors.white,
        },
        secondary: {
          color: theme.colors.white,
        },
      },
      variant: {
        filled: {
          // Color already set by type
        },
        outline: {
          // Color will be set by compound variants
        },
        ghost: {
          // Color will be set by compound variants
        },
      },
      isDisabled: {
        true: {
          color: theme.colors.muted,
        },
      },
    },
    compoundVariants: [
      // OUTLINE + TYPE combinations for loading
      {
        variant: 'outline',
        type: 'primary',
        styles: {
          color: theme.colors.primary,
        },
      },
      {
        variant: 'outline',
        type: 'danger',
        styles: {
          color: theme.colors.danger,
        },
      },
      {
        variant: 'outline',
        type: 'warning',
        styles: {
          color: theme.colors.warning,
        },
      },
      {
        variant: 'outline',
        type: 'secondary',
        styles: {
          color: theme.colors.muted,
        },
      },

      // GHOST + TYPE combinations for loading
      {
        variant: 'ghost',
        type: 'primary',
        styles: {
          color: theme.colors.primary,
        },
      },
      {
        variant: 'ghost',
        type: 'danger',
        styles: {
          color: theme.colors.danger,
        },
      },
      {
        variant: 'ghost',
        type: 'warning',
        styles: {
          color: theme.colors.warning,
        },
      },
      {
        variant: 'ghost',
        type: 'secondary',
        styles: {
          color: theme.colors.muted,
        },
      },
    ],
  },
}));
