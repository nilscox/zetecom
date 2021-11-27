import { getIds } from '../../shared/getIds';
import { AppState } from '../AppState';
import { Reducer } from '../types';

export const notificationsReducer: Reducer<AppState['notifications']> = (state, action): AppState['notifications'] => {
  if (action.type === 'setUserNotifications') {
    return {
      ...state,
      notificationsIds: getIds(action.payload.notifications),
    };
  }

  if (action.type === 'setTotalNotifications') {
    return {
      ...state,
      totalNotifications: action.payload.total,
    };
  }

  if (action.type === 'setTotalUnseenNotifications') {
    return {
      ...state,
      totalUnseenNotifications: action.payload.total,
    };
  }

  if (action.type === 'setIsFetchingNotifications') {
    return {
      ...state,
      isFetchingNotifications: action.payload.isFetching,
    };
  }

  if (action.type === 'decrementUnseenNotifications') {
    return {
      ...state,
      totalUnseenNotifications: state.totalUnseenNotifications - 1,
    };
  }

  if (action.type === 'setPollNotificationsIntervalId') {
    return {
      ...state,
      pollIntervalId: action.payload.intervalId,
    };
  }

  return state;
};
