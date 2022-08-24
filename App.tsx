import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ScreenProvider } from 'responsive-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/shared/hooks/theme';
import {
  InriaSerif_300Light,
  InriaSerif_400Regular,
  InriaSerif_700Bold
} from '@expo-google-fonts/inria-serif';

import Routes from './src/shared/routes';

import Welcome from './src/modules/authentication/screens/Welcome';
import Signin from './src/modules/authentication/screens/Signin';

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
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ScreenProvider baseFontSize={16}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </ScreenProvider>
    </SafeAreaProvider>

  );
}


