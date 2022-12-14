import { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { Dispatch, bindActionCreators } from 'redux';

import { ApplicationState } from '@shared/store';
import FullScreenLoading from '@shared/common/components/FullScreenLoading';
import { AuthenticationState } from '@shared/store/ducks/authentication/types';
import * as AuthenticationActions from '@shared/store/ducks/authentication/actions';

import { RootFeedParamsList } from '@modules/feed/routes';


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

  const linking: LinkingOptions<RootFeedParamsList> = {
    prefixes: ['exp://10.0.0.76:19000/--/poto'],
    config: {
      screens: {
        Post: {
          path: 'post/:post_id',
        }
      }
    }
  }

  useEffect(() => {
    loadStorageAuthentication()
  }, [loadStorageAuthentication])


  if (loading) {
    <FullScreenLoading />
  }

  return (
    <NavigationContainer linking={linking}>
      <SplashRoutes />
    </NavigationContainer>
  )
}

const mapStateToProps = ({ authentication }: ApplicationState) => ({
  authentication
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(AuthenticationActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Routes)

