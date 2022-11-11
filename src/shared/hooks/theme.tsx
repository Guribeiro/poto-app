import React, {
  useMemo,
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useScreen,
  ScreenContextData,
  MediaQuery,
  BreakpointValues,
  rem,
  getNearestBreakpointValue,
  validateMediaQuery,
} from 'responsive-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { dark, DarkThemeType } from '../utils/themes/dark';
import { light, LightThemeType } from '../utils/themes/light';

const ThemeContext = createContext({} as ThemeContextData);

interface ThemeContextData {
  changeTheme(theme_name: ChangeThemeProps): void;
  changeMainColor(color: ChangeMainColorProps): void;
  theme: {
    palette: Theme;
    screen: Screen;
  };
}

type Theme = LightThemeType | DarkThemeType;

interface ChangeThemeProps {
  theme_name: 'light' | 'dark';
}

interface ChangeMainColorProps {
  color: string;
}

type Query = Omit<MediaQuery, 'currentBreakpoint'>;

type Screen = Pick<ScreenContextData, 'breakpoint' | 'padding'> & {
  breakpointValue<T = unknown>(values: BreakpointValues): T | undefined;
  mediaQuery(query: Query): boolean;
  rem(size: number, shouldScale?: boolean): number;
};

export interface ResponsiveTheme {
  screen: Screen;
}

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props): JSX.Element => {
  const THEME_STORAGE_KEY = '@poto/theme';

  const [theme, setTheme] = useState<Theme>(dark);
  const { breakpoint, padding, baseFontSize, fontScaleFactor } = useScreen();

  // useEffect(() => {
  //   const loadStorage = async () => {
  //     const themeStoraged = await AsyncStorage.getItem(THEME_STORAGE_KEY);
  //     if (themeStoraged) {
  //       setTheme(JSON.parse(themeStoraged));
  //     }
  //   };
  //   loadStorage();
  // }, []);

  // useEffect(() => {
  //   AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  // }, [theme]);

  const customTheme = useMemo(() => {
    return {
      palette: theme,
      screen: {
        breakpoint,
        padding,
        rem: (size: number, shouldScale?: boolean) => {
          return rem({
            size,
            shouldScale,
            baseFontSize,
            fontScaleFactor,
          });
        },
        breakpointValue: (values: BreakpointValues) => {
          return getNearestBreakpointValue({
            breakpoint: breakpoint.size,
            values,
          });
        },
        mediaQuery: ({ minBreakpoint, maxBreakpoint, platform }: Query) => {
          return validateMediaQuery({
            minBreakpoint,
            maxBreakpoint,
            platform,
            currentBreakpoint: breakpoint.size,
          });
        },
      },
    };
  }, [breakpoint, padding, baseFontSize, fontScaleFactor, theme]);

  const changeTheme = useCallback(
    async ({ theme_name }: ChangeThemeProps) => {
      const themeOptions = {
        dark,
        light,
      };
      setTheme(themeOptions[theme_name]);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    },
    [theme],
  );

  const changeMainColor = useCallback(async ({ color }: ChangeMainColorProps) => {
    const currentTheme = { ...theme };

    currentTheme.colors.secondary = color;

    setTheme(currentTheme);

    await AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme])

  return (
    <ThemeContext.Provider value={{ changeTheme, theme: customTheme, changeMainColor }}>
      <StyledThemeProvider theme={customTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useTheme can be only called inside a ThemeProvider');

  return context;
}

export { useTheme, ThemeProvider };
