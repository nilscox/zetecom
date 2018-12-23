import { combineReducers } from 'redux';
import crio from 'crio';

import { USER_SIGNUP, USER_LOGIN, RESET_AUTH_ERRORS } from '../actions';

const INITAL_STATE = crio({
  emailAlreadyExists: false,
  invalidCredentials: false,
  fields: {},
});

const auth = (state = INITAL_STATE, action) => {
  const message = action.body && action.body.message;
  const status = action.status;

  switch (action.type) {
  case USER_SIGNUP.FAILURE:
    if (message === 'EMAIL_ALREADY_EXISTS')
      return state.set('emailAlreadyExists', true);

    if (status === 400)
      return state.set('fields', action.body);

    return state;

  case USER_LOGIN.FAILURE:
    if (message === 'INVALID_CREDENTIALS')
      return state.set('invalidCredentials', true);

    if (status === 400)
      return state.set('fields', action.body);

    return state;

  case RESET_AUTH_ERRORS:
    return INITAL_STATE;

  default:
    return state;
  }
};

export default combineReducers({
  auth,
});