import { fork } from 'redux-saga/effects';
import { authFlow, userRegisteration } from './Auth';

export default function*() {
  yield fork(authFlow);
  yield fork(userRegisteration);
}
