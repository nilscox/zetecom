import { expect } from 'earljs';

import { createUser } from '../../../../entities';
import { FakeTimerGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectTotalUnseenNotifications } from '../../selectors';

import { poolUnseenNotificationsCount } from './poolUnseenNotificationsCount';

describe('poolUnseenNotificationsCount', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let timerGateway: FakeTimerGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, timerGateway } = store.dependencies);
  });

  it("pool the user's notifications count", async () => {
    store.user = createUser();

    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(0);

    await store.dispatch(poolUnseenNotificationsCount());

    expect(store.select(selectTotalUnseenNotifications)).toEqual(0);
    expect(userGateway.fetchUnseenNotificationsCount).toBeExhausted();

    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(6);
    await timerGateway.invokeInterval();

    expect(store.select(selectTotalUnseenNotifications)).toEqual(6);
  });
});
