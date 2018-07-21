import { createAction } from 'redux-actions';

const authorize = createAction('AUTHORIZE'),
  loginError = createAction('LOGINERROR'),
  registationError = createAction('REGISTRATIONERROR'),
  logout = createAction('LOGOUT');

export { authorize, logout, loginError, registationError };
