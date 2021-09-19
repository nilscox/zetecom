import { expect } from 'earljs';

import { AuthenticatedUser, createAuthenticatedUser } from '../../../../entities';
import { paginated } from '../../../../shared';
import { MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser, selectIsFetchingAuthenticatedUser } from '../../selectors';

import { initialize } from './initialize';

describe('initialize', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway } = store.dependencies);
  });

  const setup = (user: AuthenticatedUser) => {
    userGateway.fetchAuthenticatedUser.resolvesTo(user);
    userGateway.fetchUserNotifications.resolvesToOnce(paginated([]));
  };

  it('tries to fetches the authenticated user', async () => {
    const user = createAuthenticatedUser();

    setup(user);

    const promise = store.dispatch(initialize());

    expect(store.select(selectIsFetchingAuthenticatedUser)).toEqual(true);

    await promise;

    expect(store.select(selectIsFetchingAuthenticatedUser)).toEqual(false);
    expect(store.select(selectAuthenticatedUser)).toEqual(user);
  });
});
