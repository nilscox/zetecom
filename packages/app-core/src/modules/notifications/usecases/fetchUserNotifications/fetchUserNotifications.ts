import { AuthenticationError } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import {
  setIsFetchingNotifications,
  setNotification,
  setTotalNotifications,
  setUserNotifications,
} from '../../actions';
import { stopPollUnseenNotificationsCount } from '../index';

export const fetchUserNotifications = createThunk(async ({ dispatch, userGateway }) => {
  try {
    dispatch(setIsFetchingNotifications(true));

    const { results: notifications, total } = await userGateway.fetchUserNotifications();

    dispatch(setNotification(...notifications));
    dispatch(setUserNotifications(notifications));
    dispatch(setTotalNotifications(total));
  } catch (error) {
    if (error instanceof AuthenticationError && error.status === 403) {
      dispatch(stopPollUnseenNotificationsCount());
    } else {
      // TODO: handle error
      console.error(error);
    }
  } finally {
    dispatch(setIsFetchingNotifications(false));
  }
});
