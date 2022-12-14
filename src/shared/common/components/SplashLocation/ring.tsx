import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import styled from 'styled-components';


const Container = styled(Animated.View)`
  position: absolute;
  width: ${({ theme }) => theme.screen.rem(5)}px;
  height: ${({ theme }) => theme.screen.rem(5)}px;
  border-radius:${({ theme }) => theme.screen.rem(2.5)}px;
  border-color: ${({ theme }) => theme.palette.colors.secondary};
  border-width: 10px;
  border-style: solid;
`;

interface RingProps {
  delay: number;
}

const Ring = ({ delay }: RingProps): JSX.Element => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false
      )
    );
  }, []);

  return (
    <Container style={ringStyle} />
  )
}

export default Ring;
