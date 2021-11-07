import { createThunk } from '../../../../store/createThunk';
import { setNotification } from '../../../../store/normalize';
import { decrementUnseenNotifications } from '../../actions';
import { selectNotification } from '../../selectors';

export const markNotificationAsSeen = createThunk(
  async ({ getState, dispatch, userGateway, dateGateway, trackingGateway }, notificationId: string) => {
    const notification = selectNotification(getState(), notificationId);

    dispatch(setNotification({ ...notification, seen: dateGateway.now }));
    dispatch(decrementUnseenNotifications());

    await userGateway.markNotificationAsSeen(notificationId);

    trackingGateway.track({
      category: 'notification',
      action: 'notification marked as seen',
    });
  },
);
