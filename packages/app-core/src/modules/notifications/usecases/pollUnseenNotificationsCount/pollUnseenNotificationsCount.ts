import { createThunk } from '../../../../store/createThunk';
import { setPollNotificationsIntervalId, setTotalUnseenNotifications } from '../../actions';
import { selectPollNotificationsIntervalId } from '../../selectors';

const POLL_INTERVAL = 60 * 1000;

export const pollUnseenNotificationsCount = createThunk(async ({ dispatch, timerGateway }) => {
  await dispatch(fetchUnseenNotificationsCount());

  const intervalId = timerGateway.setInterval(() => dispatch(fetchUnseenNotificationsCount()), POLL_INTERVAL);

  dispatch(setPollNotificationsIntervalId(intervalId));
});

const fetchUnseenNotificationsCount = createThunk(async ({ dispatch, userGateway }) => {
  try {
    const count = await userGateway.fetchUnseenNotificationsCount();

    dispatch(setTotalUnseenNotifications(count));
  } catch (error) {
    // TODO: handle error
    console.error(error);
  }
});

export const stopPollUnseenNotificationsCount = createThunk(async ({ dispatch, getState, timerGateway }) => {
  const intervalId = selectPollNotificationsIntervalId(getState());

  if (intervalId === undefined) {
    return;
  }

  timerGateway.clearInterval(intervalId);
  dispatch(setPollNotificationsIntervalId(undefined));
});
