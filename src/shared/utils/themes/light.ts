import { Palette } from './palette';

export const light: Palette = {
  title: 'light',
  fonts: {
    light: 'InriaSerif_300Light',
    regular: 'InriaSerif_400Regular',
    bold: 'InriaSerif_700Bold',
  },
  colors: {
    primary: '#1B1B1F',
    secondary: '#29292E',
    texts: {
      light: '#FFFFFF',
      medium: '#7A7A80',
      strong: '#47474D',
    },
    shapes: {
      light: '#FFFFFF',
      strong: '#F4F5F6',
    },
    green: '#03B252',
    red: '#DC1637',
    white: '#FFFFFF',
  },
} as const;

export type LightThemeType = typeof light;
