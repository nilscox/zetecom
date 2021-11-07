import { expect } from 'earljs';

import { AuthenticatedUserDto, createAuthenticatedUser } from '../../../../entities';
import { paginated } from '../../../../shared';
import {
  MockNotificationGateway,
  MockRouterGateway,
  MockTrackingGateway,
  MockUserGateway,
} from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser, selectAuthenticationGlobalError, selectIsAuthenticating } from '../../selectors';

import { signup } from './signup';

describe('signup', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let routerGateway: MockRouterGateway;
  let notificationGateway: MockNotificationGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, routerGateway, notificationGateway, trackingGateway } = store.dependencies);
  });

  const setup = (user: AuthenticatedUserDto, requiresEmailValidation = true) => {
    userGateway.signup.resolvesTo({ ...user, requiresEmailValidation });
    routerGateway.push.returnsOnce(undefined);
    userGateway.fetchUserNotifications.resolvesToOnce(paginated([]));
  };

  const execute = (location: 'app' | 'popup' = 'app') => {
    return store.dispatch(signup('email', 'password', 'nick', location));
  };

  it('signs up', async () => {
    const user = createAuthenticatedUser({ email: 'some@email.tld' });

    setup(user);

    await execute();

    expect(userGateway.signup).toHaveBeenCalledWith(['email', 'password', 'nick']);

    expect(store.select(selectAuthenticatedUser)).toEqual(undefined);

    expect(notificationGateway.success).toHaveBeenCalledWith([
      'Pour finaliser votre inscription, un email vous a été envoyé à some@email.tld',
    ]);
  });

  it('signs up and sets the user as authenticated when he is not required to validate his email', async () => {
    const user = createAuthenticatedUser();

    setup(user, false);

    await execute();

    expect(store.select(selectAuthenticatedUser)).toEqual(user);

    expect(notificationGateway.success).toHaveBeenCalledWith(['Bienvenue ! 🎉']);
  });

  it('redirects to the app home page', async () => {
    setup(createAuthenticatedUser(), false);

    await execute('app');

    expect(routerGateway.push).toHaveBeenCalledWith(['/']);
  });

  it('does not redirect when signing up from the popup', async () => {
    setup(createAuthenticatedUser(), false);

    await execute('popup');

    expect(routerGateway.push).not.toBeExhausted();
  });

  it('notifies that the user is signing up', async () => {
    setup(createAuthenticatedUser());
    await store.testLoadingState(signup('email', 'password', 'nick', 'app'), selectIsAuthenticating);
  });

  it('prevents from signing up when the user is already authenticated', async () => {
    store.user = createAuthenticatedUser();

    await execute();

    expect(store.select(selectAuthenticationGlobalError)).toEqual('Vous êtes déjà connecté.e.');
  });

  describe('tracking', () => {
    for (const location of ['app', 'popup'] as const) {
      it(`tracks a signup event from the ${location}`, async () => {
        setup(createAuthenticatedUser());

        await execute(location);

        expect(trackingGateway.track).toHaveBeenCalledWith([
          { category: 'authentication', action: 'signup', name: `signup from ${location}` },
        ]);
      });
    }
  });
});
