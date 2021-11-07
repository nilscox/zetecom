import { expect } from 'earljs';

import { AuthenticationField, createAuthenticatedUser } from '../../../../entities';
import { paginated } from '../../../../shared';
import { MockNotificationGateway, MockRouterGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setAuthenticationField } from '../../actions';

import { submitAuthenticationForm } from './submitAuthenticationForm';

describe('submitAuthenticationForm', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let routerGateway: MockRouterGateway;
  let notificationGateway: MockNotificationGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, routerGateway, notificationGateway } = store.dependencies);

    userGateway.requestAuthenticationLink.resolvesToOnce(undefined);
    userGateway.login.resolvesToOnce(createAuthenticatedUser());
    userGateway.signup.resolvesToOnce({ requiresEmailValidation: true, ...createAuthenticatedUser() });
    notificationGateway.success.returnsOnce(undefined);
  });

  const setup = (pathname: string, authenticationFields: Partial<Record<AuthenticationField, string>>) => {
    routerGateway.pathname = pathname;
    routerGateway.push.returnsOnce(undefined);
    userGateway.fetchUserNotifications.resolvesToOnce(paginated([]));

    for (const [field, value] of Object.entries(authenticationFields)) {
      store.dispatch(setAuthenticationField(field as AuthenticationField, value));
    }
  };

  const execute = (location: 'app' | 'popup' = 'app') => {
    return store.dispatch(submitAuthenticationForm(location));
  };

  const email = 'email';
  const password = 'password';
  const nick = 'nick';

  it('requests an authentication link', async () => {
    setup('/lien-de-connexion', { email });

    await execute();

    expect(userGateway.requestAuthenticationLink).toHaveBeenCalledWith([email]);
  });

  it('logs in', async () => {
    setup('/connexion', { email, password });

    await execute();

    expect(userGateway.login).toHaveBeenCalledWith([email, password]);
  });

  it('signs up', async () => {
    setup('/inscription', { email, password, nick });

    await execute();

    expect(userGateway.signup).toHaveBeenCalledWith([email, password, nick]);
  });
});
