import { Notification } from '../../../entities';
import { createAction } from '../../../store/createAction';

export { setNotification } from '../../../store/normalize';

export const setUserNotifications = (notifications: Notification[]) => {
  return createAction('setUserNotifications', { notifications });
};

export const setTotalNotifications = (total: number) => {
  return createAction('setTotalNotifications', { total });
};

export const setTotalUnseenNotifications = (total: number) => {
  return createAction('setTotalUnseenNotifications', { total });
};

export const setIsFetchingNotifications = (isFetching: boolean) => {
  return createAction('setIsFetchingNotifications', { isFetching });
};

export const decrementUnseenNotifications = () => {
  return createAction('decrementUnseenNotifications');
};

export type NotificationsActions = ReturnType<
  | typeof setIsFetchingNotifications
  | typeof setUserNotifications
  | typeof setTotalNotifications
  | typeof setTotalUnseenNotifications
  | typeof decrementUnseenNotifications
>;
