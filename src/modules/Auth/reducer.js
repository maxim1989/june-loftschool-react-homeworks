import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { authorize, logout, loginError, registationError } from './actions';

const isAuthorized = handleActions(
  {
    [authorize]: () => true,
    [logout]: () => false
  },
  false
);

const loginErrorReducer = handleActions(
  {
    [loginError]: (_state, action) => action.payload
  },
  null
);

const registationErrorReducer = handleActions(
  {
    [registationError]: (_state, action) => action.payload.data.message.email[0]
  },
  null
);

export default combineReducers({
  isAuthorized,
  loginError: loginErrorReducer,
  registationError: registationErrorReducer
});
