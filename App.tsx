import React, { useCallback, useEffect, useState } from 'react';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenProvider } from 'responsive-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/shared/hooks/theme';
import { Provider } from 'react-redux';
import store from './src/shared/store';
import {
  InriaSerif_300Light,
  InriaSerif_400Regular,
  InriaSerif_700Bold
} from '@expo-google-fonts/inria-serif';

import Routes from './src/shared/routes';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        loadAsync({
          InriaSerif_300Light,
          InriaSerif_400Regular,
          InriaSerif_700Bold
        });
        await new Promise(resolve => setTimeout(resolve, 4000));

      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <ScreenProvider baseFontSize={16}>
          <ThemeProvider>
            <Routes />
          </ThemeProvider>
        </ScreenProvider>
      </SafeAreaProvider>
    </Provider>
  );
}


