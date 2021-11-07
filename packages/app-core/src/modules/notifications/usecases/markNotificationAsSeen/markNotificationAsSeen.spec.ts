import { expect } from 'earljs';

import { createNotification, createUser, Notification } from '../../../../entities';
import { MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setNotification, setTotalUnseenNotifications, setUserNotifications } from '../../actions';
import { selectNotification, selectTotalUnseenNotifications } from '../../selectors';

import { markNotificationAsSeen } from './markNotificationAsSeen';

describe('markNotificationAsSeen', () => {
  let store: MemoryStore;

  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ trackingGateway } = store.dependencies);
  });

  const setup = (notification: Notification) => {
    store.user = createUser();

    store.dispatch(setNotification(notification));
    store.dispatch(setUserNotifications([notification]));
    store.dispatch(setTotalUnseenNotifications(1));

    store.dependencies.userGateway.markNotificationAsSeen.resolvesToOnce(undefined);
  };

  it('marks a notification as seen', async () => {
    const notification = createNotification();
    const now = store.dependencies.dateGateway.now;

    setup(notification);

    await store.dispatch(markNotificationAsSeen(notification.id));

    expect(store.select(selectNotification, notification.id)?.seen).toEqual(now);
    expect(store.select(selectTotalUnseenNotifications)).toEqual(0);

    expect(store.dependencies.userGateway.markNotificationAsSeen).toHaveBeenCalledWith([notification.id]);
  });

  it('tracks a notification seen event', async () => {
    const notification = createNotification();

    setup(notification);

    await store.dispatch(markNotificationAsSeen(notification.id));

    expect(trackingGateway.track).toHaveBeenCalledWith([
      { category: 'notification', action: 'notification marked as seen' },
    ]);
  });
});
