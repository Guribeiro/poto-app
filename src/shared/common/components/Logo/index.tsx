import { Image, ImageSourcePropType } from 'react-native';

import logoSmall from '../../assets/logo/poto-logo.png';
import logoMedium from '../../assets/logo-medium/poto-logo-medium.png';

type Size = 'small' | 'medium';

type LogoProps = {
  size?: Size
}

type LogoVariations = {
  small: ImageSourcePropType;
  medium: ImageSourcePropType
}

const logoVariations = {
  small: logoSmall,
  medium: logoMedium,
}

const Logo = ({ size = 'small' }: LogoProps): JSX.Element => {

  const logo = logoVariations[size];

  return (
    <Image source={logo} />
  )
}

export default Logo;