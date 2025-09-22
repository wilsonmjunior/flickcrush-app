import { Image, ImageBackground } from 'expo-image';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { SizeToken } from '@/core/theme';
import { Text, TextProps } from '.';

const { width: screenWidth } = Dimensions.get('window');

const BASE_WIDTH = screenWidth * 0.3;

type CardProps = {
  children: React.ReactNode;
  variant?: 'filled' | 'outline';
  onPress?: () => void;
};

function Card({ children, variant = 'filled', onPress }: CardProps) {
  styles.useVariants({ variant });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

type CardImageProps = {
  uri: string;
  size?: Extract<SizeToken, 'sm' | 'md' | 'lg'>;
};

function CardImage({ uri, size = 'sm' }: CardImageProps) {
  styles.useVariants({ size });

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
}

type CardImageBackgroundProps = {
  uri: string;
  size?: Extract<SizeToken, 'sm' | 'md' | 'lg'>;
  children?: React.ReactNode;
};

function CardImageBackground({ uri, size = 'sm', children }: CardImageBackgroundProps) {
  styles.useVariants({ size });

  return (
    <View style={styles.imageContainer}>
      <ImageBackground source={{ uri }} style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
}

type CardTitleProps = Omit<TextProps, 'variant' | 'size'>;

function CardTitle({ children, ...props }: CardTitleProps) {
  return (
    <Text variant="heading" size="md" numberOfLines={2} {...props}>
      {children}
    </Text>
  );
}

type CardDescriptionProps = Omit<TextProps, 'variant' | 'size'>;

function CardDescription({ children, ...props }: CardDescriptionProps) {
  return (
    <Text variant="body" size="sm" {...props}>
      {children}
    </Text>
  );
}

type CardRowProps = {
  children: React.ReactNode;
};

function CardRow({ children }: CardRowProps) {
  return <View style={styles.row}>{children}</View>;
}

type CardColumnProps = {
  children: React.ReactNode;
};

function CardColumn({ children }: CardColumnProps) {
  return <View style={styles.column}>{children}</View>;
}

type CardActionButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
};

function CardActionButton({ children, onPress }: CardActionButtonProps) {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
}

Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Image = CardImage;
Card.ImageBackground = CardImageBackground;
Card.Row = CardRow;
Card.Column = CardColumn;
Card.Action = CardActionButton;

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: 8,
    gap: 16,

    variants: {
      variant: {
        outline: {
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        filled: {
          borderWidth: 0,
        },
      },
    },
  },
  imageContainer: {
    borderRadius: 8,
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 8,

    variants: {
      size: {
        sm: {
          width: BASE_WIDTH,
          height: BASE_WIDTH * 1.5,
        },
        md: {
          width: BASE_WIDTH * 1.5,
          height: BASE_WIDTH * 1.5 * 1.5,
        },
        lg: {
          width: BASE_WIDTH * 3,
          height: BASE_WIDTH * 3 * 1.5,
        },
      },
    },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    gap: theme.spacing.md,
  },
  actionButton: {
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
}));

export { Card };
