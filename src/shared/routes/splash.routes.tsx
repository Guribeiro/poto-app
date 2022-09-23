import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '@shared/hooks/theme';
import { ApplicationState } from '@shared/store';
import Splash from '@shared/common/components/Splash';
import AuthenticationRoutes from '@modules/authentication/routes';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';
import { AuthenticationState, LoginRequestPayload } from '@shared/store/ducks/authentication/types';

import AppRoutes from '@modules/app/routes';

export type RootSplashParamsList = {
  Splash: undefined;
  AppRoutes: undefined;
};

const { Navigator, Screen } =
  createNativeStackNavigator<RootSplashParamsList>();

type DispatchProps = {
  loginRequest(data: LoginRequestPayload): void;
}

type StateProps = {
  authentication: AuthenticationState;
}

type SplashRoutesProps = StateProps & DispatchProps;


const SplashRoutes = ({ authentication }: SplashRoutesProps): JSX.Element => {
  const { data } = authentication;
  const { theme } = useTheme();

  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.palette.colors.primary,
        },
      }}
    >
      {!data.token && (
        <Screen name="Splash" component={Splash} />
      )}

      <Screen
        name="AppRoutes"
        component={data.token ? AppRoutes : AuthenticationRoutes}
      />
    </Navigator>
  );
};

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashRoutes)
