import { Notification } from '../../../entities';
import { AppState } from '../../../store/AppState';
import { selectNotification } from '../../../store/normalize';

export { selectNotification };

export const selectIsFetchingNotifications = (state: AppState): boolean => {
  return state.notifications.isFetchingNotifications;
};

export const selectUserNotifications = (state: AppState): Notification[] => {
  return state.notifications.notificationsIds.map((id) => selectNotification(state, id));
};

export const selectTotalNotifications = (state: AppState): number => {
  return state.notifications.totalNotifications;
};

export const selectTotalUnseenNotifications = (state: AppState): number => {
  return state.notifications.totalUnseenNotifications;
};

export const selectNotificationsBadge = (state: AppState): string | undefined => {
  const totalNotifications = selectTotalUnseenNotifications(state);

  if (totalNotifications) {
    return String(totalNotifications);
  }
};

export const selectPollNotificationsIntervalId = (state: AppState): number | undefined => {
  return state.notifications.pollIntervalId;
};
