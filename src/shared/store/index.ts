import {configureStore, Store, applyMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks/rootReducer';
import {AuthenticationState} from './ducks/authentication/types';
import preloadedAuthenticationState from './ducks/authentication/preloadedAuthenticationState';
import rootSaga from './ducks/rootSagas';

const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
  authentication: AuthenticationState
}

const store: Store<ApplicationState> = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddlewares){
    return getDefaultMiddlewares().concat(sagaMiddleware);
  },
})

sagaMiddleware.run(rootSaga);

export default store;