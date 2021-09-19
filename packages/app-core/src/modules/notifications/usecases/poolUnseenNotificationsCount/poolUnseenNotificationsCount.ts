import { createThunk } from '../../../../store/createThunk';
import { setTotalUnseenNotifications } from '../../actions';

const POOL_INTERVAL = 60 * 1000;

export const poolUnseenNotificationsCount = createThunk(async ({ dispatch, timerGateway }) => {
  await dispatch(fetchUnseenNotificationsCount());
  timerGateway.setInterval(() => dispatch(fetchUnseenNotificationsCount()), POOL_INTERVAL);
});

const fetchUnseenNotificationsCount = createThunk(async ({ dispatch, userGateway }) => {
  try {
    const count = await userGateway.fetchUnseenNotificationsCount();

    dispatch(setTotalUnseenNotifications(count));
  } catch {
    //
  }
});
