import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import {
  setTokenApi,
  clearTokenApi,
  registrationRequest,
  login
} from '../../api';
import {
  authorize,
  logout,
  registration,
  getIsAuthorized,
  registationError
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
    } else {
      const action = yield take(authorize);

      token = action.payload;
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);

    yield take(logout);

    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}

function* registerationSaga(action) {
  try {
    const response = yield call(registrationRequest, action.payload);

    console.log('@@@@@@@@');
    console.log('@@@@@@@@');
    console.log('response =', response);
    console.log('@@@@@@@@');
    console.log('@@@@@@@@');
    yield setTokenToLocalStorage(response.data.jwt);
    yield put(authorize());
  } catch (error) {
    yield put(registationError(error));
  }
}

export function* userRegisteration() {
  yield takeEvery(registration.toString(), registerationSaga);
}
