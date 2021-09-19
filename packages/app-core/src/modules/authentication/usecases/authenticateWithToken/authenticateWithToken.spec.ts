import { expect } from 'earljs';

import { AuthenticationError, createAuthenticatedUser } from '../../../../entities';
import { MockNotificationGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';

import { authenticateWithToken } from './authenticateWithToken';

describe('authenticateWithToken', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let notificationGateway: MockNotificationGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, notificationGateway } = store.dependencies);

    notificationGateway.success.returns(undefined);
    notificationGateway.error.returns(undefined);
  });

  const token = 'c68f6087-1289-4e47-8ad4-d8c70abc35ea';

  it('authenticates with a token', async () => {
    const user = createAuthenticatedUser({ nick: 'user' });

    userGateway.authenticateWithToken.resolvesToOnce(user);

    await store.dispatch(authenticateWithToken(token));

    expect(store.user).toEqual(user);

    expect(userGateway.authenticateWithToken).toHaveBeenCalledWith([token]);
    expect(notificationGateway.success).toHaveBeenCalledWith(['Vous êtes maintenant connecté.e en tant que user.']);
  });

  it("fails to validate the user's email", async () => {
    userGateway.authenticateWithToken.rejectsWithOnce(
      new AuthenticationError(401, { message: 'INVALID_EMAIL_LOGIN_TOKEN' }),
    );

    await store.dispatch(authenticateWithToken(token));

    expect(notificationGateway.error).toHaveBeenCalledWith(["Le lien de connexion n'est pas valide."]);
  });

  it("fails to validate the user's email when the token is not a uuid", async () => {
    await store.dispatch(authenticateWithToken('token'));

    expect(notificationGateway.error).toHaveBeenCalledWith(["Le jeton présent dans le lien n'est pas valide."]);
  });
});
