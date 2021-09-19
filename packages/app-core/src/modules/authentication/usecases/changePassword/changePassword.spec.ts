import { expect } from 'earljs';

import { AuthenticationError, AuthenticationField } from '../../../../entities';
import { MockNotificationGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { selectAuthenticationFieldError, selectIsChangingPassword } from '../../selectors';

import { changePassword } from './changePassword';

describe('changePassword', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let notificationGateway: MockNotificationGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, notificationGateway } = store.dependencies);
  });

  // cSpell:words passw

  it("changes the user's password", async () => {
    userGateway.changePassword.resolvesToOnce(undefined);
    notificationGateway.success.returns(undefined);

    await store.dispatch(changePassword('passw0rd'));

    expect(userGateway.changePassword).toHaveBeenCalledWith(['passw0rd']);
    expect(notificationGateway.success).toHaveBeenCalledWith(['Votre mot de passe a bien été mis à jour.']);
  });

  it('notifies that the user in changing its password', async () => {
    userGateway.changePassword.resolvesToOnce(undefined);
    notificationGateway.success.returns(undefined);

    await store.testLoadingState(changePassword('passw0rd'), selectIsChangingPassword);
  });

  it('handles errors on the password field', async () => {
    userGateway.changePassword.rejectsWithOnce(new AuthenticationError(400, { password: { minLength: 'minLength' } }));

    await store.dispatch(changePassword('pass'));

    expect(store.select(selectAuthenticationFieldError, AuthenticationField.password)).not.toEqual(undefined);
  });

  it("fails to change the users's password", async () => {
    userGateway.changePassword.rejectsWithOnce(new Error('nope'));
    notificationGateway.warning.returns(undefined);

    await store.dispatch(changePassword('passw0rd'));

    expect(notificationGateway.warning).toHaveBeenCalledWith([
      "Une erreur s'est produite, votre mot de passe n'a pas été mis à jour",
    ]);
  });
});
