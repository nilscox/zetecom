import { expect } from 'earljs';

import { createUser } from '../../../../entities';
import { FakeTimerGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectPollNotificationsIntervalId, selectTotalUnseenNotifications } from '../../selectors';

import { pollUnseenNotificationsCount, stopPollUnseenNotificationsCount } from './pollUnseenNotificationsCount';

describe('pollUnseenNotificationsCount', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let timerGateway: FakeTimerGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, timerGateway } = store.dependencies);
  });

  const setup = () => {
    store.user = createUser();
    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(0);
  };

  it("poll the user's notifications count", async () => {
    setup();

    await store.dispatch(pollUnseenNotificationsCount());

    expect(store.select(selectTotalUnseenNotifications)).toEqual(0);
    expect(userGateway.fetchUnseenNotificationsCount).toBeExhausted();

    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(2);
    await timerGateway.invokeInterval();

    expect(store.select(selectTotalUnseenNotifications)).toEqual(2);
  });

  it("stores the poll notifications interval's id", async () => {
    setup();

    await store.dispatch(pollUnseenNotificationsCount());

    expect(store.select(selectPollNotificationsIntervalId)).toEqual(6);
  });

  it('stops polling unseen notifications count', async () => {
    setup();

    await store.dispatch(pollUnseenNotificationsCount());
    await store.dispatch(stopPollUnseenNotificationsCount());

    expect(timerGateway.interval).toEqual(undefined);
    expect(store.select(selectPollNotificationsIntervalId)).toEqual(undefined);
  });
});
