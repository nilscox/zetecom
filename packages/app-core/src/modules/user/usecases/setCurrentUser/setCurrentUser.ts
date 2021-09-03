import { User } from '../../../../entities/User';
import { createThunk } from '../../../../store/createThunk';
import { setUser } from '../../../../store/normalize';
import { setCurrentUser as setCurrentUserAction } from '../../userActions';

export const setCurrentUser = createThunk(({ dispatch }, user: User | undefined) => {
  if (user) {
    dispatch(setUser(user));
  }

  dispatch(setCurrentUserAction(user));
});
