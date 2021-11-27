import { AuthenticatedUser } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
// eslint-disable-next-line import/no-internal-modules
import { pollUnseenNotificationsCount, stopPollUnseenNotificationsCount } from '../../../notifications/usecases';
import { setAuthenticatedUser as setAuthenticatedUserAction, setUser, unsetAuthenticatedUser } from '../../actions';

export const setAuthenticatedUser = createThunk(async ({ dispatch }, user: AuthenticatedUser | undefined) => {
  if (user) {
    dispatch(setUser(user));
    dispatch(setAuthenticatedUserAction(user));
    await dispatch(pollUnseenNotificationsCount());
  } else {
    dispatch(unsetAuthenticatedUser());
    dispatch(stopPollUnseenNotificationsCount());
  }
});
