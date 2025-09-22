import { createContext, memo, ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

interface SkeletonContextType {
  animatedValue: Animated.Value;
}

const SkeletonContext = createContext<SkeletonContextType | null>(null);

interface SkeletonRootProps {
  children: ReactNode;
}

function Skeleton({ children }: SkeletonRootProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const contextValue = useMemo(
    () => ({
      animatedValue,
    }),
    [animatedValue]
  );

  return (
    <SkeletonContext.Provider value={contextValue}>
      <View>{children}</View>
    </SkeletonContext.Provider>
  );
}

interface SkeletonBaseProps {
  width?: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const useSkeletonContext = () => {
  const context = useContext(SkeletonContext);
  if (!context) {
    throw new Error('Skeleton components must be used within <Skeleton>');
  }
  return context;
};

const SkeletonBase = memo(({ width, height, borderRadius = 4, style }: SkeletonBaseProps) => {
  const { animatedValue } = useSkeletonContext();
  const { theme } = useUnistyles();

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.muted, theme.colors.text],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        } as any,
        style,
      ]}
    />
  );
});

SkeletonBase.displayName = 'SkeletonBase';

const SkeletonText = memo((props: SkeletonBaseProps) => {
  return <SkeletonBase borderRadius={4} {...props} />;
});

SkeletonText.displayName = 'SkeletonText';

const SkeletonBox = memo((props: SkeletonBaseProps) => {
  return <SkeletonBase borderRadius={8} {...props} />;
});

SkeletonBox.displayName = 'SkeletonBox';

interface SkeletonCircleProps {
  size?: number;
  height?: number;
  style?: ViewStyle;
}

const SkeletonCircle = memo(({ size, height, style }: SkeletonCircleProps) => {
  const circleSize = size || height || 40;
  return (
    <SkeletonBase
      width={circleSize}
      height={circleSize}
      borderRadius={circleSize / 2}
      style={style}
    />
  );
});

SkeletonCircle.displayName = 'SkeletonCircle';

interface SkeletonListProps {
  children: ReactNode;
  gap?: number;
  style?: ViewStyle;
}

const SkeletonList = memo(({ children, style }: SkeletonListProps) => {
  return <View style={style}>{children}</View>;
});

SkeletonList.displayName = 'SkeletonList';

interface SkeletonRowProps {
  children: ReactNode;
  gap?: number;
  style?: ViewStyle;
}

const SkeletonRow = memo(({ children, gap = 8, style }: SkeletonRowProps) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>{children}</View>
  );
});

SkeletonRow.displayName = 'SkeletonRow';

interface SkeletonGroupProps {
  children: ReactNode;
  style?: ViewStyle;
}

const SkeletonGroup = memo(({ children, style }: SkeletonGroupProps) => {
  return <View style={style}>{children}</View>;
});

SkeletonGroup.displayName = 'SkeletonGroup';

Skeleton.Text = SkeletonText;
Skeleton.Box = SkeletonBox;
Skeleton.Circle = SkeletonCircle;
Skeleton.List = SkeletonList;
Skeleton.Row = SkeletonRow;
Skeleton.Group = SkeletonGroup;

export { Skeleton };
