import { expect } from 'earljs';

import { AuthenticationError, createNotification, createUser } from '../../../../entities';
import { paginated } from '../../../../shared';
import { array } from '../../../../shared/array';
import { MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setPollNotificationsIntervalId } from '../../actions';
import {
  selectIsFetchingNotifications,
  selectPollNotificationsIntervalId,
  selectTotalNotifications,
  selectUserNotifications,
} from '../../selectors';

import { fetchUserNotifications } from './fetchUserNotifications';

describe('fetchUserNotifications', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway } = store.dependencies);
  });

  it("fetches the user's notifications", async () => {
    const notifications = array(2, createNotification());

    store.user = createUser();
    userGateway.fetchUserNotifications.resolvesToOnce(paginated(notifications));

    const promise = store.dispatch(fetchUserNotifications());

    expect(store.select(selectIsFetchingNotifications)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingNotifications)).toEqual(false);
    expect(store.select(selectUserNotifications)).toEqual(notifications);
    expect(store.select(selectTotalNotifications)).toEqual(2);
  });

  it('stops polling unseen notifications count', async () => {
    store.user = createUser();
    store.dispatch(setPollNotificationsIntervalId(6));

    userGateway.fetchUserNotifications.rejectsWithOnce(new AuthenticationError(403, {}));

    await store.dispatch(fetchUserNotifications());

    expect(store.select(selectPollNotificationsIntervalId)).toEqual(undefined);
  });
});
