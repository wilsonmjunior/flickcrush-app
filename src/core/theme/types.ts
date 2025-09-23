import type { UnistylesThemes } from 'react-native-unistyles';

export type ColorToken = keyof UnistylesThemes['light']['colors'];
export type SpacingToken = keyof UnistylesThemes['light']['spacing'];
export type SizeToken = keyof UnistylesThemes['light']['sizes'];
export type RadiusToken = keyof UnistylesThemes['light']['radius'];
export type BorderToken = keyof UnistylesThemes['light']['border'];

export type TextToken = 'body' | 'heading' | 'caption';

export type ThemeColors = UnistylesThemes['light']['colors'];
export type ThemeSpacing = UnistylesThemes['light']['spacing'];
export type ThemeSizes = UnistylesThemes['light']['sizes'];
export type ThemeRadius = UnistylesThemes['light']['radius'];
export type ThemeBorder = UnistylesThemes['light']['border'];
