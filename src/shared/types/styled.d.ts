import 'styled-components';
import { Theme } from '../utils/themes/palette';
import type { ResponsiveTheme } from '../hooks/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ResponsiveTheme, Theme {}
}
