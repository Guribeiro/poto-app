/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../Text';


import { RootSplashParamsList } from '@shared/routes/splash.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/currency.svg';
import { Container } from './styles';

type SplashScreenProps = NativeStackNavigationProp<
  RootSplashParamsList,
  'Splash'
>;

const Splash = (): JSX.Element => {
  const { navigate } = useNavigation<SplashScreenProps>();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const startApp = useCallback(() => {
    // navigation.dispatch(StackActions.replace('Home'));
    navigate('Home');
  }, [navigate]);

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
      {/* <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={117} height={113} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={400} height={71} />
      </Animated.View> */}
      <Text>Splash screen</Text>
    </Container>
  );
};

export default Splash;
