export { default } from './reducer';

export { authorize, logout, loginError, registationError } from './actions';

export {
  getIsAuthorized,
  getLoginErrorReducer,
  getRegistationErrorReducer
} from './selectors';
