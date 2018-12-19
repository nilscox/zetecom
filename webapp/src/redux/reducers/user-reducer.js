import crio from 'crio';

import { USER_FETCH_ME, USER_LOGIN, USER_SIGNUP } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case USER_FETCH_ME.SUCCESS:
    case USER_LOGIN.SUCCESS:
    case USER_SIGNUP.SUCCESS:
      if (action.status === 200)
        return crio(action.body);
      else
        return null;

    default:
      return state;
  }
};
