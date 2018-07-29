import { createAction } from 'redux-actions';

const authorize = createAction('AUTHORIZE'),
  authorizeRequest = createAction('AUTHORIZEREQUEST'),
  loginError = createAction('LOGINERROR'),
  registationError = createAction('REGISTRATIONERROR'),
  logout = createAction('LOGOUT'),
  registration = createAction('REGISTRATION');

export { authorize, authorizeRequest, logout, loginError, registationError, registration };
