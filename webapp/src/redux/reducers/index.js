import { combineReducers } from 'redux';

import user from './user-reducer';
import loading from './loading-reducer';

export default combineReducers({
  user,
  loading,
});
