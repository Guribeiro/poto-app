import { Marker, MapMarkerProps } from 'react-native-maps';
import { useTheme } from '@shared/hooks/theme';

type CustomMapMarkerProps = MapMarkerProps;

const CustomMapMarker = ({ children, ...props }: CustomMapMarkerProps): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Marker
      {...props}
      pinColor={theme.palette.colors.secondary}
    >
      {children}
    </Marker>
  )
}

export default CustomMapMarker;
