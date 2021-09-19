import { expect } from 'earljs';

import { createAuthenticatedUser } from '../../../../entities';
import { MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser } from '../../selectors';

import { setAuthenticatedUser } from './setAuthenticatedUser';

describe('setAuthenticatedUser', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway } = store.dependencies);
  });

  it('sets the authenticated user', async () => {
    const user = createAuthenticatedUser();

    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(0);

    await store.dispatch(setAuthenticatedUser(user));

    expect(store.select(selectAuthenticatedUser)).toEqual(user);
    expect(userGateway.fetchUnseenNotificationsCount).toBeExhausted();
  });

  it('unsets the authenticated user', async () => {
    store.user = createAuthenticatedUser();

    await store.dispatch(setAuthenticatedUser(undefined));

    expect(store.select(selectAuthenticatedUser)).toEqual(undefined);
  });
});
