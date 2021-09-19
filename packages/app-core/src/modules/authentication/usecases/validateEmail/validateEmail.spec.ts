import { expect } from 'earljs';

import { AuthenticationError, createAuthenticatedUser } from '../../../../entities';
import { MockNotificationGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';

import { validateEmail } from './validateEmail';

describe('validateEmail', () => {
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

  it("validates the user's email", async () => {
    const user = createAuthenticatedUser();

    userGateway.validateEmail.resolvesToOnce(user);

    await store.dispatch(validateEmail(token));

    expect(store.user).toEqual(user);

    expect(userGateway.validateEmail).toHaveBeenCalledWith([token]);
    expect(notificationGateway.success).toHaveBeenCalledWith(['Votre adresse email a bien été validée ! Bienvenue 🎉']);
  });

  it("fails to validate the user's email when the token is not valid", async () => {
    userGateway.validateEmail.rejectsWithOnce(new AuthenticationError(400, { message: 'USER_EMAIL_TOKEN_NOT_FOUND' }));

    await store.dispatch(validateEmail(token));

    expect(notificationGateway.error).toHaveBeenCalledWith(["Le lien de validation d'adresse email n'est pas valide."]);
  });

  it("fails to validate the user's email when it is already validated", async () => {
    userGateway.validateEmail.rejectsWithOnce(new AuthenticationError(400, { message: 'EMAIL_ALREADY_VALIDATED' }));

    await store.dispatch(validateEmail(token));

    expect(notificationGateway.error).toHaveBeenCalledWith(['Votre adresse email a déjà été validée.']);
  });

  it("fails to validate the user's email when the token is not a uuid", async () => {
    userGateway.validateEmail.resolvesToOnce(createAuthenticatedUser());

    await store.dispatch(validateEmail('token'));

    expect(userGateway.validateEmail).not.toBeExhausted();
    expect(notificationGateway.error).toHaveBeenCalledWith(["Le jeton présent dans le lien n'est pas valide."]);
  });

  it("fails to validate the user's email for an unknown reason", async () => {
    userGateway.validateEmail.rejectsWithOnce(new Error('nope'));

    await store.dispatch(validateEmail(token));

    expect(notificationGateway.error).toHaveBeenCalledWith([
      "Quelque chose s'est mal passé, votre adresse email n'a pas pu être validée. Veuillez réessayer plus tard...",
    ]);
  });
});
