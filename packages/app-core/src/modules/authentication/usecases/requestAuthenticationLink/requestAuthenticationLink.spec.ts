import { expect } from 'earljs';

import { createAuthenticatedUser } from '../../../../entities';
import { MockNotificationGateway, MockTrackingGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticationGlobalError, selectIsAuthenticating } from '../../selectors';

import { requestAuthenticationLink } from './requestAuthenticationLink';

describe('requestAuthenticationLink', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let notificationGateway: MockNotificationGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, notificationGateway, trackingGateway } = store.dependencies);

    userGateway.requestAuthenticationLink.resolvesToOnce(undefined);
  });

  const execute = (location: 'app' | 'popup' = 'app') => {
    return store.dispatch(requestAuthenticationLink(email, location));
  };

  const email = 'email@domain.tld';

  it('requests a link to authenticate without a password', async () => {
    await execute();

    expect(userGateway.requestAuthenticationLink).toHaveBeenCalledWith([email]);
  });

  it('displays a success notification', async () => {
    await execute();

    expect(notificationGateway.success).toHaveBeenCalledWith([
      "Un email contenant un lien de connexion vient d'être envoyé à l'adresse email@domain.tld.",
    ]);
  });

  it('notifies that the user is requesting an authentication link', async () => {
    await store.testLoadingState(requestAuthenticationLink('email', 'app'), selectIsAuthenticating);
  });

  it('prevents from requesting an authentication link in when the user is already authenticated', async () => {
    store.user = createAuthenticatedUser();

    await execute();

    expect(store.select(selectAuthenticationGlobalError)).toEqual('Vous êtes déjà connecté.e.');
  });

  describe('tracking', () => {
    for (const location of ['app', 'popup'] as const) {
      it(`tracks an authentication link request event from the ${location}`, async () => {
        await execute(location);

        expect(trackingGateway.track).toHaveBeenCalledWith([
          {
            category: 'authentication',
            action: 'request authentication link',
            name: `request authentication link from ${location}`,
          },
        ]);
      });
    }
  });
});
