import { expect } from 'earljs';

import { AuthenticatedUser, AuthenticationError, createAuthenticatedUser } from '../../../../entities';
import { MockRouterGateway, MockTrackingGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser, selectAuthenticationGlobalError, selectIsAuthenticating } from '../../selectors';

import { login } from './login';

describe('login', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let routerGateway: MockRouterGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, routerGateway, trackingGateway } = store.dependencies);
  });

  const setup = (user: AuthenticatedUser) => {
    userGateway.login.resolvesTo(user);
    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(0);
    routerGateway.push.returns(undefined);
  };

  const execute = (location: 'app' | 'popup' = 'app') => {
    return store.dispatch(login('email', 'password', location));
  };

  it('logs in', async () => {
    const user = createAuthenticatedUser();

    setup(user);

    await execute();

    expect(userGateway.login).toHaveBeenCalledWith(['email', 'password']);
    expect(userGateway.fetchUnseenNotificationsCount).toBeExhausted();

    expect(store.select(selectAuthenticatedUser)).toEqual(user);
  });

  it('notifies that the user is logging in', async () => {
    setup(createAuthenticatedUser());
    await store.testLoadingState(login('email', 'password', 'app'), selectIsAuthenticating);
  });

  it('redirects to the app home page', async () => {
    setup(createAuthenticatedUser());

    await execute('app');

    expect(routerGateway.push).toHaveBeenCalledWith(['/']);
  });

  it('redirects to the popup account tab', async () => {
    setup(createAuthenticatedUser());

    await execute('popup');

    expect(routerGateway.push).toHaveBeenCalledWith(['/popup/compte']);
  });

  it('prevents from logging in when the user is already authenticated', async () => {
    store.user = createAuthenticatedUser();

    await execute();

    expect(store.select(selectAuthenticationGlobalError)).toEqual('Vous êtes déjà connecté.e.');
  });

  describe('tracking', () => {
    for (const location of ['app', 'popup'] as const) {
      it(`tracks a login event from the ${location}`, async () => {
        setup(createAuthenticatedUser());

        await execute(location);

        expect(trackingGateway.track).toHaveBeenCalledWith([
          { category: 'authentication', action: 'login', name: `login from ${location}` },
        ]);
      });

      it('tracks a login failed event', async () => {
        userGateway.login.rejectsWithOnce(new AuthenticationError(400, { message: 'INVALID_CREDENTIALS' }));

        await execute(location);

        expect(trackingGateway.track).toHaveBeenCalledWith([
          { category: 'authentication', action: 'login failed', name: `login failed from ${location}` },
        ]);
      });
    }
  });
});
