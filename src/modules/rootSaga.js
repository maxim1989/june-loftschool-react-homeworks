import { fork } from 'redux-saga/effects';
import { authFlow } from './Auth';

export default function*() {
  yield fork(authFlow);
}
