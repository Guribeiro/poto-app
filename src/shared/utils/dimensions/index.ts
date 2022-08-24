import { Dimensions } from 'react-native';

type Dimension = {
  width: number;
  height: number;
};

const dimension: Dimension = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export { dimension };
