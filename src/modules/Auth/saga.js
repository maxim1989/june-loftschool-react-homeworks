import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import {
  setTokenApi,
  clearTokenApi,
  registrationRequest,
  login
} from '../../api';
import {
  authorize,
  authorizeRequest,
  logout,
  registration,
  getIsAuthorized,
  registationError,
  loginError
} from '../Auth';
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from '../localStorage';

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);

    let token;

    if (!isAuthorized && localStorageToken) {
      token = localStorageToken;
      yield put(authorize());

      if (token) {
        yield call(setTokenApi, token);
        yield call(setTokenToLocalStorage, token);
      }

      yield take(logout);

      yield call(removeTokenFromLocalStorage);
      yield call(clearTokenApi);
    } else {
      const action = yield take(authorizeRequest);

      token = null;

      try {
        const response = yield call(login, action.payload);

        token = response.data.jwt;
        yield put(authorize());

        if (token) {
          yield call(setTokenApi, token);
          yield call(setTokenToLocalStorage, token);
        }

        yield take(logout);

        yield call(removeTokenFromLocalStorage);
        yield call(clearTokenApi);
      } catch (error) {
        yield put(loginError(error));
      }
    }
  }
}

function* registerationSaga(action) {
  try {
    const response = yield call(registrationRequest, action.payload);

    yield setTokenToLocalStorage(response.data.jwt);
    yield put(authorize());
  } catch (error) {
    yield put(registationError(error));
  }
}

export function* userRegisteration() {
  yield takeEvery(registration.toString(), registerationSaga);
}
