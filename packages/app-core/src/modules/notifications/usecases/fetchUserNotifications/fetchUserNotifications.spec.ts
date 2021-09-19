import { expect } from 'earljs';

import { createNotification, createUser } from '../../../../entities';
import { paginated } from '../../../../shared';
import { array } from '../../../../shared/array';
import { MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectIsFetchingNotifications, selectTotalNotifications, selectUserNotifications } from '../../selectors';

import { fetchUserNotifications } from './fetchUserNotifications';

describe('fetchUserNotifications', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway } = store.dependencies);

    userGateway.fetchUserNotifications.resolvesTo(paginated([]));
  });

  it("fetches the user's notifications", async () => {
    const notifications = array(2, createNotification());

    store.user = createUser();

    userGateway.fetchUserNotifications.resolvesTo(paginated(notifications));

    const promise = store.dispatch(fetchUserNotifications());

    expect(store.select(selectIsFetchingNotifications)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingNotifications)).toEqual(false);
    expect(store.select(selectUserNotifications)).toEqual(notifications);
    expect(store.select(selectTotalNotifications)).toEqual(2);
  });
});
