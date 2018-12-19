import crio from 'crio';

import { USER_FETCH_ME, USER_LOGIN, USER_SIGNUP, USER_LOGOUT } from '../actions';

export default (state = crio({ user: true, userAuth: false, userLogout: false }), action) => {
  switch (action.type) {
    case USER_FETCH_ME.REQUEST:
      return state.set('user', true);

    case USER_FETCH_ME.FINISH:
      return state.set('user', false);

    case USER_LOGIN.REQUEST:
    case USER_SIGNUP.REQUEST:
      return state.set('userAuth', true);

    case USER_LOGIN.FINISH:
    case USER_SIGNUP.FINISH:
      return state.set('userAuth', false);

    case USER_LOGOUT.REQUEST:
      return state.set('userLogout', true);

    case USER_LOGOUT.FINISH:
      return state.set('userLogout', false);

    default:
      return state;
  }
};
