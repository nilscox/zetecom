import { expect } from 'earljs';

import { AuthenticatedUser, AuthenticationError, createAuthenticatedUser } from '../../../../entities';
import { MockNotificationGateway, MockTrackingGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';

import { validateEmail } from './validateEmail';

describe('validateEmail', () => {
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
      userGateway.validateEmail.resolvesToOnce(user);
    } else if (error) {
      userGateway.validateEmail.rejectsWithOnce(error);
    }
  };

  const token = 'c68f6087-1289-4e47-8ad4-d8c70abc35ea';

  it("validates the user's email", async () => {
    const user = createAuthenticatedUser();

    setup({ user });

    await store.dispatch(validateEmail(token));

    expect(store.user).toEqual(user);

    expect(userGateway.validateEmail).toHaveBeenCalledWith([token]);
    expect(notificationGateway.success).toHaveBeenCalledWith(['Votre adresse email a bien été validée ! Bienvenue 🎉']);
  });

  it('tracks an email validated event', async () => {
    setup({ user: createAuthenticatedUser() });

    await store.dispatch(validateEmail(token));

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'authentication', action: 'email validated' }]);
  });

  it("fails to validate the user's email when the token is not valid", async () => {
    setup({ error: new AuthenticationError(400, { message: 'USER_EMAIL_TOKEN_NOT_FOUND' }) });

    await store.dispatch(validateEmail(token));

    expect(notificationGateway.error).toHaveBeenCalledWith(["Le lien de validation d'adresse email n'est pas valide."]);
  });

  it("fails to validate the user's email when it is already validated", async () => {
    setup({ error: new AuthenticationError(400, { message: 'EMAIL_ALREADY_VALIDATED' }) });

    await store.dispatch(validateEmail(token));

    expect(notificationGateway.error).toHaveBeenCalledWith(['Votre adresse email a déjà été validée.']);
  });

  it("fails to validate the user's email when the token is not a uuid", async () => {
    setup({ user: createAuthenticatedUser() });

    await store.dispatch(validateEmail('token'));

    expect(userGateway.validateEmail).not.toBeExhausted();
    expect(notificationGateway.error).toHaveBeenCalledWith(["Le jeton présent dans le lien n'est pas valide."]);
  });

  it("fails to validate the user's email for an unknown reason", async () => {
    setup({ error: new Error('nope') });

    await store.dispatch(validateEmail(token));

    expect(notificationGateway.error).toHaveBeenCalledWith([
      "Quelque chose s'est mal passé, votre adresse email n'a pas pu être validée. Veuillez réessayer plus tard...",
    ]);
  });
});
