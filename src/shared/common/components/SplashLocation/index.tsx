/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect } from 'react';
import {
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { RootLocationParamsList } from '@modules/app/routes/location.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useLocation } from '@shared/hooks/location';

import { Text } from '../Text';

import Ring from './ring';
import { Container } from './styles';

type SplashScreenProps = NativeStackNavigationProp<
  RootLocationParamsList,
  'SplashLocation'
>;

const SplashLocation = (): JSX.Element => {
  const { navigate } = useNavigation<SplashScreenProps>();
  const splashAnimation = useSharedValue(0);

  const { location } = useLocation();


  const startApp = useCallback(() => {
    // navigation.dispatch(StackActions.replace('Home'));
    if (location) {
      navigate('AppRoutes');
    }
  }, [navigate, location]);

  useEffect(() => {
    let mounted = true;

    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      if (mounted) {
        ('worklet');
        runOnJS(startApp)();
      }
    });

    return () => {
      mounted = false;
    };
  }, [splashAnimation, startApp]);

  return (
    <Container>
      <Ring delay={0} />
      <Ring delay={1000} />
      <Ring delay={2000} />
      <Ring delay={3000} />
      <Text>Só um momento, estamos buscando a sua localização...</Text>
    </Container>
  );
};

export default SplashLocation;
