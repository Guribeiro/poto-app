import { all, takeLatest } from 'redux-saga/effects';

import { AuthenticationTypes } from './authentication/types';
import { login, logout, signup } from './authentication/sagas';


export default function* rootSaga() {
  yield all([
    takeLatest(AuthenticationTypes.SIGNUP_REQUEST, signup),
    takeLatest(AuthenticationTypes.LOAD_AUTHENTICATION_REQUEST, login),
    takeLatest(AuthenticationTypes.LOGOUT_REQUEST, logout),
  ]);
}
