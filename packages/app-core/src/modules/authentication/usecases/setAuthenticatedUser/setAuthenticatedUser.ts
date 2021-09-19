import { AuthenticatedUser } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
// eslint-disable-next-line import/no-internal-modules
import { poolUnseenNotificationsCount } from '../../../notifications/usecases';
import { setAuthenticatedUser as setAuthenticatedUserAction, setUser, unsetAuthenticatedUser } from '../../actions';

export const setAuthenticatedUser = createThunk(async ({ dispatch }, user: AuthenticatedUser | undefined) => {
  if (user) {
    dispatch(setUser(user));
    dispatch(setAuthenticatedUserAction(user));
  } else {
    dispatch(unsetAuthenticatedUser());
  }

  if (user) {
    await dispatch(poolUnseenNotificationsCount());
  }
});
