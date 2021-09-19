import { expect } from 'earljs';

import { AuthenticatedUser, createAuthenticatedUser } from '../../../../entities';
import { MockRouterGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticatedUser, selectAuthenticationGlobalError, selectIsAuthenticating } from '../../selectors';

import { login } from './login';

describe('login', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let routerGateway: MockRouterGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, routerGateway } = store.dependencies);
  });

  const setup = (user: AuthenticatedUser) => {
    userGateway.login.resolvesTo(user);
    userGateway.fetchUnseenNotificationsCount.resolvesToOnce(0);
    routerGateway.push.returns(undefined);
  };

  it('logs in', async () => {
    const user = createAuthenticatedUser();

    setup(user);

    await store.dispatch(login('email', 'password'));

    expect(userGateway.login).toHaveBeenCalledWith(['email', 'password']);
    expect(userGateway.fetchUnseenNotificationsCount).toBeExhausted();

    expect(store.select(selectAuthenticatedUser)).toEqual(user);

    expect(routerGateway.push).toHaveBeenCalledWith(['/']);
  });

  it('notifies that the user is logging in', async () => {
    setup(createAuthenticatedUser());
    await store.testLoadingState(login('email', 'password'), selectIsAuthenticating);
  });

  it('prevents from logging in when the user is already authenticated', async () => {
    store.user = createAuthenticatedUser();

    await store.dispatch(login('email', 'password'));

    expect(store.select(selectAuthenticationGlobalError)).toEqual('Vous êtes déjà connecté.e.');
  });
});
