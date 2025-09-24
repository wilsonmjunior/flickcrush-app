// components/layout/Box.tsx
import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { BorderToken, ColorToken, RadiusToken, SpacingToken } from '@/core/theme';
import { BoxProps } from './types';

export function Box({
  children,
  // Spacing props
  m,
  p,
  mt,
  mb,
  ml,
  mr,
  pt,
  pb,
  pl,
  pr,
  px,
  py,
  mx,
  my,
  // Flex props
  flex,
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  alignSelf,
  // Style props
  bg,
  width,
  height,
  borderRadius,
  borderWidth,
  borderColor,
  gap,
}: BoxProps) {
  const { theme } = useUnistyles();

  // Helper para converter spacing
  const getSpacing = (value: keyof typeof theme.spacing | number | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return theme.spacing[value];
  };

  // Helper para converter cor
  const getColor = (color: ColorToken) => {
    if (color === undefined) return undefined;
    if (typeof color === 'string' && color.startsWith('#')) return color;
    return theme.colors[color as keyof typeof theme.colors];
  };

  // Helper para border radius
  const getBorderRadius = (radius: RadiusToken) => {
    if (radius === undefined) return undefined;
    if (typeof radius === 'number') return radius;
    return theme.radius[radius];
  };

  // Helper para border width
  const getBorderWidth = (width: BorderToken) => {
    if (width === undefined) return undefined;
    if (typeof width === 'number') return width;
    return theme.border[width];
  };

  // Helper para gap
  const getGap = (gap: SpacingToken) => {
    if (gap === undefined) return undefined;
    return theme.gap(theme.spacing[gap]);
  };

  const dynamicStyle = {
    // Spacing
    ...(m !== undefined && { margin: getSpacing(m) }),
    ...(mt !== undefined && { marginTop: getSpacing(mt) }),
    ...(mb !== undefined && { marginBottom: getSpacing(mb) }),
    ...(ml !== undefined && { marginLeft: getSpacing(ml) }),
    ...(mr !== undefined && { marginRight: getSpacing(mr) }),
    ...(mx !== undefined && { marginHorizontal: getSpacing(mx) }),
    ...(my !== undefined && { marginVertical: getSpacing(my) }),

    ...(p !== undefined && { padding: getSpacing(p) }),
    ...(pt !== undefined && { paddingTop: getSpacing(pt) }),
    ...(pb !== undefined && { paddingBottom: getSpacing(pb) }),
    ...(pl !== undefined && { paddingLeft: getSpacing(pl) }),
    ...(pr !== undefined && { paddingRight: getSpacing(pr) }),
    ...(px !== undefined && { paddingHorizontal: getSpacing(px) }),
    ...(py !== undefined && { paddingVertical: getSpacing(py) }),

    // Flex
    ...(flex !== undefined && { flex }),
    ...(justifyContent && { justifyContent }),
    ...(alignItems && { alignItems }),
    ...(flexDirection && { flexDirection }),
    ...(flexWrap && { flexWrap }),
    ...(alignSelf && { alignSelf }),

    // Style
    ...(bg && { backgroundColor: getColor(bg) }),
    ...(width && { width }),
    ...(height && { height }),
    ...(borderRadius !== undefined && { borderRadius: getBorderRadius(borderRadius) }),
    ...(borderWidth && { borderWidth: getBorderWidth(borderWidth) }),
    ...(borderColor && { borderColor: getColor(borderColor) }),

    // Gap
    ...(gap && { gap: getGap(gap) }),
  };

  return <View style={[styles.container, dynamicStyle]}>{children}</View>;
}

const styles = StyleSheet.create((theme) => ({
  container: {},
}));
