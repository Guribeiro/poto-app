import { configureStore, Store, applyMiddleware, ConfigureStoreOptions, CombinedState } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './ducks/rootReducer';
import preloadedAuthenticationState from './ducks/authentication/preloadedAuthenticationState';

import { AuthenticationState } from './ducks/authentication/types';
import { PostsState } from './ducks/posts/types';
import { FeedState } from './ducks/feed/types';

import rootSaga from './ducks/rootSagas';

const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
  authentication: AuthenticationState;
  posts: PostsState;
  feed: FeedState;
}


const store: Store<ApplicationState> = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddlewares) {
    return getDefaultMiddlewares().concat(sagaMiddleware);
  },

})

sagaMiddleware.run(rootSaga);

export default store;
