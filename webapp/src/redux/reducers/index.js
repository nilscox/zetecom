import { combineReducers } from 'redux';

import user from './user-reducer';
import loading from './loading-reducer';
import errors from './errors-reducer';

export default combineReducers({
  user,
  loading,
  errors,
});
