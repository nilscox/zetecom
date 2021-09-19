import { expect } from 'earljs';

import { createAuthenticatedUser } from '../../../../entities';
import { MockNotificationGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticationGlobalError, selectIsAuthenticating } from '../../selectors';

import { requestAuthenticationLink } from './requestAuthenticationLink';

describe('requestAuthenticationLink', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let notificationGateway: MockNotificationGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, notificationGateway } = store.dependencies);

    userGateway.requestAuthenticationLink.resolvesToOnce(undefined);
    notificationGateway.success.returns(undefined);
  });

  it('requests a link to authenticate without a password', async () => {
    await store.dispatch(requestAuthenticationLink('email@domain.tld'));

    expect(userGateway.requestAuthenticationLink).toHaveBeenCalledWith(['email@domain.tld']);
    expect(notificationGateway.success).toHaveBeenCalledWith([
      "Un email contenant un lien de connexion vient d'être envoyé à l'adresse email@domain.tld.",
    ]);
  });

  it('notifies that the user in requesting an authentication link', async () => {
    await store.testLoadingState(requestAuthenticationLink('email'), selectIsAuthenticating);
  });

  it('prevents from requesting an authentication link in when the user is already authenticated', async () => {
    store.user = createAuthenticatedUser();

    await store.dispatch(requestAuthenticationLink('email'));

    expect(store.select(selectAuthenticationGlobalError)).toEqual('Vous êtes déjà connecté.e.');
  });
});
