import { createThunk } from '../../../../store/createThunk';
import {
  setIsFetchingNotifications,
  setNotification,
  setTotalNotifications,
  setUserNotifications,
} from '../../actions';

export const fetchUserNotifications = createThunk(async ({ dispatch, userGateway }) => {
  dispatch(setIsFetchingNotifications(true));

  const { results: notifications, total } = await userGateway.fetchUserNotifications();

  dispatch(setNotification(...notifications));
  dispatch(setUserNotifications(notifications));
  dispatch(setTotalNotifications(total));

  dispatch(setIsFetchingNotifications(false));
});
