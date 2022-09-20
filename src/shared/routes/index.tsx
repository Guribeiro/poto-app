import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthenticationState, User } from '@shared/store/ducks/authentication/types';
import { ApplicationState } from '@shared/store';
import { Dispatch, bindActionCreators } from 'redux';
import FullScreenLoading from '@shared/common/components/FullScreenLoading';

import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';
import { useEffect } from 'react';

import SplashRoutes from './splash.routes';


type StateProps = {
  authentication: AuthenticationState;
}

type DispatchProps = {
  loadStorageAuthentication(): void;
}

type RoutesProps = StateProps & DispatchProps;

const Routes = ({ authentication, loadStorageAuthentication }: RoutesProps): JSX.Element => {
  const { loading } = authentication;

  useEffect(() => {
    loadStorageAuthentication()
  },[loadStorageAuthentication])


  if(loading) {
    <FullScreenLoading />
  }

  return (
    <NavigationContainer>
      <SplashRoutes />
    </NavigationContainer>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes)

