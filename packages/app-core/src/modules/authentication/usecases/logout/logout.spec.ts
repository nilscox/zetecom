import { expect } from 'earljs';

import { createUser } from '../../../../entities';
import { MockTrackingGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser, selectIsAuthenticating } from '../../selectors';

import { logout } from './logout';

describe('logout', () => {
  let store: MemoryStore;

  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ trackingGateway } = store.dependencies);
  });

  const setup = () => {
    store.user = createUser();
    store.dependencies.userGateway.logout.resolvesToOnce(undefined);
    store.dependencies.routerGateway.push.returnsOnce(undefined);
  };

  const execute = (location: 'app' | 'popup' = 'app') => {
    return store.dispatch(logout(location));
  };

  it('logs out', async () => {
    setup();

    const promise = execute();

    expect(store.select(selectIsAuthenticating)).toEqual(true);

    await promise;

    expect(store.select(selectIsAuthenticating)).toEqual(false);
    expect(store.select(selectAuthenticatedUser)).toEqual(undefined);
  });

  it("redirects to the app's authentication view", async () => {
    setup();

    await execute('app');

    expect(store.dependencies.routerGateway.push).toHaveBeenCalledWith(['/connexion']);
  });

  it("redirects to the popup's authentication view", async () => {
    setup();

    await execute('popup');

    expect(store.dependencies.routerGateway.push).toHaveBeenCalledWith(['/popup/connexion']);
  });

  describe('tracking', () => {
    for (const location of ['app', 'popup'] as const) {
      it('tracks a logout event', async () => {
        setup();

        await execute(location);

        expect(trackingGateway.track).toHaveBeenCalledWith([
          { category: 'authentication', action: 'logout', name: `logout from ${location}` },
        ]);
      });
    }
  });
});
