import { expect } from 'earljs';

import { AuthenticatedUserDto, createAuthenticatedUser } from '../../../../entities';
import { paginated } from '../../../../shared';
import { MockNotificationGateway, MockRouterGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser, selectAuthenticationGlobalError, selectIsAuthenticating } from '../../selectors';

import { signup } from './signup';

describe('signup', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let routerGateway: MockRouterGateway;
  let notificationGateway: MockNotificationGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, routerGateway, notificationGateway } = store.dependencies);
  });

  const setup = (user: AuthenticatedUserDto, requiresEmailValidation = true) => {
    userGateway.signup.resolvesTo({ ...user, requiresEmailValidation });
    routerGateway.push.returns(undefined);
    userGateway.fetchUserNotifications.resolvesToOnce(paginated([]));
    notificationGateway.success.returnsOnce(undefined);
  };

  it('signs up', async () => {
    const user = createAuthenticatedUser({ email: 'some@email.tld' });

    setup(user);

    await store.dispatch(signup('email', 'password', 'nick'));

    expect(userGateway.signup).toHaveBeenCalledWith(['email', 'password', 'nick']);

    expect(store.select(selectAuthenticatedUser)).toEqual(undefined);

    expect(notificationGateway.success).toHaveBeenCalledWith([
      'Pour finaliser votre inscription, un email vous a été envoyé à some@email.tld',
    ]);
  });

  it('signs up and sets the user as authenticated when he is not required to validate his email', async () => {
    const user = createAuthenticatedUser();

    setup(user, false);

    await store.dispatch(signup('email', 'password', 'nick'));

    expect(store.select(selectAuthenticatedUser)).toEqual(user);

    expect(routerGateway.push).toHaveBeenCalledWith(['/']);
    expect(notificationGateway.success).toHaveBeenCalledWith(['Bienvenue ! 🎉']);
  });

  it('notifies that the user is signing up', async () => {
    setup(createAuthenticatedUser());
    await store.testLoadingState(signup('email', 'password', 'nick'), selectIsAuthenticating);
  });

  it('prevents from signing up when the user is already authenticated', async () => {
    store.user = createAuthenticatedUser();

    await store.dispatch(signup('email', 'password', 'nick'));

    expect(store.select(selectAuthenticationGlobalError)).toEqual('Vous êtes déjà connecté.e.');
  });
});
