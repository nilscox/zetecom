import { expect } from 'earljs';

import { createNotification, createUser } from '../../../../entities';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setNotification, setTotalUnseenNotifications, setUserNotifications } from '../../actions';
import { selectNotification, selectTotalUnseenNotifications } from '../../selectors';

import { markNotificationAsSeen } from './markNotificationAsSeen';

describe('markNotificationAsSeen', () => {
  let store: MemoryStore;

  beforeEach(() => {
    store = new MemoryStore();
  });

  it('marks a notification as seen', async () => {
    const notification = createNotification();
    const now = store.dependencies.dateGateway.now;

    store.user = createUser();

    store.dispatch(setNotification(notification));
    store.dispatch(setUserNotifications([notification]));
    store.dispatch(setTotalUnseenNotifications(1));

    store.dependencies.userGateway.markNotificationAsSeen.resolvesToOnce(undefined);

    await store.dispatch(markNotificationAsSeen(notification.id));

    expect(store.select(selectNotification, notification.id)?.seen).toEqual(now);
    expect(store.select(selectTotalUnseenNotifications)).toEqual(0);

    expect(store.dependencies.userGateway.markNotificationAsSeen).toHaveBeenCalledWith([notification.id]);
  });
});
