import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '@shared/hooks/theme';
import SplashLocation from '@shared/common/components/SplashLocation';
import AuthenticationRoutes from '@modules/authentication/routes';

import AppRoutes from '@modules/app/routes';
import { useLocation } from '@shared/hooks/location';

export type RootLocationParamsList = {
  SplashLocation: undefined;
  AppRoutes: undefined;
};

const { Navigator, Screen } =
  createNativeStackNavigator<RootLocationParamsList>();


const LocationRoutes = (): JSX.Element => {
  const { theme } = useTheme();
  const { location } = useLocation();

  return (
    <Navigator
      initialRouteName="SplashLocation"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.primary,
        },
      }}
    >
      {!location && (
        <Screen name="SplashLocation" component={SplashLocation} />
      )}

      <Screen
        name="AppRoutes"
        component={AppRoutes}
      />
    </Navigator>
  );
};

export default LocationRoutes
