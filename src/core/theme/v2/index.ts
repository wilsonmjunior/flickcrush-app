import { StyleSheet } from 'react-native-unistyles';

const darkTheme = {
  colors: {
    primary: '#00D4FF', // Ciano elétrico - tecnológico e cinematográfico
    background: '#0A0A0F', // Preto profundo como sala de cinema
    surface: '#1A1A24', // Superfície escura com toque roxo
    text: '#FFFFFF', // Branco puro para máximo contraste
    muted: '#8B8B9E', // Cinza azulado para textos secundários
    border: '#2A2A3A', // Bordas sutis com toque roxo
    success: '#00FF88', // Verde neon vibrante
    warning: '#FFB800', // Âmbar cinematográfico
    danger: '#FF3366', // Rosa neon para erros
    shape: '#ffffff',
    white: '#ffffff',
  },
  gap: (v: number) => v * 8,
} as const;

const lightTheme = {
  colors: {
    primary: '#0099CC', // Azul tecnológico mais suave
    background: '#F5F7FA', // Branco acinzentado moderno
    surface: '#FFFFFF', // Branco puro
    text: '#1A1A2E', // Azul escuro quase preto
    muted: '#6B7280', // Cinza moderno
    border: '#E5E7EB', // Bordas suaves
    success: '#10B981', // Verde moderno
    warning: '#F59E0B', // Laranja suave
    danger: '#EF4444', // Vermelho moderno
    shape: '#000000',
    white: '#ffffff',
  },
  gap: (v: number) => v * 8,
} as const;

const baseTheme = {
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
    '3xl': 56,
    '4xl': 64,
    '5xl': 80,
    '6xl': 96,
    '7xl': 112,
    '8xl': 128,
  },
  border: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 999,
  },
  sizes: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 40,
    '7xl': 44,
    '8xl': 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

export const appThemes = {
  light: { ...lightTheme, ...baseTheme },
  dark: { ...darkTheme, ...baseTheme },
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

export type {
  BorderToken,
  ColorToken,
  RadiusToken,
  SizeToken,
  SpacingToken,
  TextToken,
  ThemeBorder,
  ThemeColors,
  ThemeRadius,
  ThemeSizes,
  ThemeSpacing
} from '../types';

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
    // initialTheme: 'light' as const,
  },
  themes: appThemes,
  breakpoints,
});
