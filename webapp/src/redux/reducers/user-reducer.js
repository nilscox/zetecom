import crio from 'crio';

import { FETCH_USER } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER.SUCCESS:
      if (action.status === 200)
        return crio(action.body);
      else
        return null;

    default:
      return state;
  }
};
