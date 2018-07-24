import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { setTokenApi, clearTokenApi, registration, login } from '../../api';
import { authorize, logout, registeration, getIsAuthorized } from '../Auth';
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
    const response = yield call(getUserFollowers, action.payload);

    yield put(successFollowers(response));
  } catch (error) {
    yield put(failureFollowers(error.toString()));
  }
}

export function* userRegisteration() {
  yield takeEvery(registeration.toString(), registerationSaga);
}