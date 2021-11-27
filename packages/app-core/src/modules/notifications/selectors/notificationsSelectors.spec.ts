import { createNotification, createUser } from '../../../entities';
import { MemoryStore } from '../../../store/MemoryStore';
import {
  setIsFetchingNotifications,
  setNotification,
  setPollNotificationsIntervalId,
  setTotalNotifications,
  setTotalUnseenNotifications,
  setUserNotifications,
} from '../actions';

import {
  selectIsFetchingNotifications,
  selectNotification,
  selectNotificationsBadge,
  selectPollNotificationsIntervalId,
  selectTotalNotifications,
  selectTotalUnseenNotifications,
  selectUserNotifications,
} from './notificationsSelectors';

describe('notificationsSelectors', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  beforeEach(() => {
    store.user = createUser();
  });

  it('selectNotification', () => {
    const notification = createNotification();

    store.testState(selectNotification, notification.id).expect({
      before: undefined,
      action: setNotification(notification),
      after: notification,
    });
  });

  it('selectIsFetchingNotifications', () => {
    store.testState(selectIsFetchingNotifications).expect({
      before: false,
      action: setIsFetchingNotifications(true),
      after: true,
    });
  });

  it('selectUserNotifications', () => {
    const notification = createNotification();

    store.dispatch(setNotification(notification));

    store.testState(selectUserNotifications).expect({
      before: [],
      action: setUserNotifications([notification]),
      after: [notification],
    });
  });

  it('selectTotalNotifications', () => {
    store.testState(selectTotalNotifications).expect({
      before: 0,
      action: setTotalNotifications(1),
      after: 1,
    });
  });

  it('selectTotalUnseenNotifications', () => {
    store.testState(selectTotalUnseenNotifications).expect({
      before: 0,
      action: setTotalUnseenNotifications(1),
      after: 1,
    });
  });

  it('selectNotificationsBadge', () => {
    store
      .testState(selectNotificationsBadge)
      .expect({
        before: undefined,
        action: setTotalUnseenNotifications(0),
        after: undefined,
      })
      .expect({
        before: undefined,
        action: setTotalUnseenNotifications(1),
        after: '1',
      });
  });

  it('selectNotificationsPollIntervalId', () => {
    store.testState(selectPollNotificationsIntervalId).expect({
      before: undefined,
      action: setPollNotificationsIntervalId(6),
      after: 6,
    });
  });
});
