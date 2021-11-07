import { expect } from 'earljs';

import { AuthenticatedUser, AuthenticationError, createAuthenticatedUser } from '../../../../entities';
import { MockNotificationGateway, MockTrackingGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';

import { authenticateWithToken } from './authenticateWithToken';

describe('authenticateWithToken', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let notificationGateway: MockNotificationGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, notificationGateway, trackingGateway } = store.dependencies);
  });

  const setup = ({ user, error }: { user?: AuthenticatedUser; error?: Error }) => {
    if (user) {
      userGateway.authenticateWithToken.resolvesToOnce(user);
    } else if (error) {
      userGateway.authenticateWithToken.rejectsWithOnce(error);
    }
  };

  const execute = () => {
    return store.dispatch(authenticateWithToken(token));
  };

  const token = 'c68f6087-1289-4e47-8ad4-d8c70abc35ea';

  it('authenticates with a token', async () => {
    const user = createAuthenticatedUser();

    setup({ user });

    await execute();

    expect(store.user).toEqual(user);
    expect(userGateway.authenticateWithToken).toHaveBeenCalledWith([token]);
  });

  it('displays a success notification', async () => {
    setup({ user: createAuthenticatedUser({ nick: 'user' }) });

    await execute();

    expect(notificationGateway.success).toHaveBeenCalledWith(['Vous êtes maintenant connecté.e en tant que user.']);
  });

  it('tracks a token login event', async () => {
    setup({ user: createAuthenticatedUser() });

    await execute();

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'authentication', action: 'login with token' }]);
  });

  it("fails to validate the user's email", async () => {
    setup({ error: new AuthenticationError(401, { message: 'INVALID_EMAIL_LOGIN_TOKEN' }) });

    await store.dispatch(authenticateWithToken(token));

    expect(notificationGateway.error).toHaveBeenCalledWith(["Le lien de connexion n'est pas valide."]);
  });

  it("fails to validate the user's email when the token is not a uuid", async () => {
    await store.dispatch(authenticateWithToken('token'));

    expect(notificationGateway.error).toHaveBeenCalledWith(["Le jeton présent dans le lien n'est pas valide."]);
  });
});
