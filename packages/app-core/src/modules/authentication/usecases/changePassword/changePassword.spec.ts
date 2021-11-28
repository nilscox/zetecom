import { expect } from 'earljs';

import { AuthenticationError, AuthenticationField } from '../../../../entities';
import { MockNotificationGateway, MockTrackingGateway, MockUserGateway } from '../../../../shared/mocks';
import { MemoryStore } from '../../../../store/MemoryStore';
import { setAuthenticationField } from '../../actions';
import { selectAuthenticationField, selectAuthenticationFieldError, selectIsChangingPassword } from '../../selectors';

import { changePassword } from './changePassword';

describe('changePassword', () => {
  let store: MemoryStore;

  let userGateway: MockUserGateway;
  let notificationGateway: MockNotificationGateway;
  let trackingGateway: MockTrackingGateway;

  beforeEach(() => {
    store = new MemoryStore();
    ({ userGateway, notificationGateway, trackingGateway } = store.dependencies);
  });

  const setup = (error?: Error) => {
    if (error) {
      userGateway.changePassword.rejectsWithOnce(error);
    } else {
      userGateway.changePassword.resolvesToOnce(undefined);
    }
  };

  // cSpell:words passw

  const execute = () => {
    return store.dispatch(changePassword('passw0rd'));
  };

  it("changes the user's password", async () => {
    setup();

    await execute();

    expect(userGateway.changePassword).toHaveBeenCalledWith(['passw0rd']);
  });

  describe('clear the password field', () => {
    it('clears the password field on success', async () => {
      setup();
      store.dispatch(setAuthenticationField(AuthenticationField.password, 'passw0rd'));

      await execute();

      expect(store.select(selectAuthenticationField, AuthenticationField.password)).toEqual('');
    });

    it('does not clear the password field on failure', async () => {
      setup(new Error());
      store.dispatch(setAuthenticationField(AuthenticationField.password, 'passw0rd'));

      await execute();

      expect(store.select(selectAuthenticationField, AuthenticationField.password)).toEqual('passw0rd');
    });
  });

  it('displays a success notification', async () => {
    setup();

    await execute();

    expect(notificationGateway.success).toHaveBeenCalledWith(['Votre mot de passe a bien été mis à jour.']);
  });

  it('notifies that the user in changing its password', async () => {
    setup();
    await store.testLoadingState(changePassword('passw0rd'), selectIsChangingPassword);
  });

  it('tracks a password changed event', async () => {
    setup();

    await execute();

    expect(trackingGateway.track).toHaveBeenCalledWith([{ category: 'authentication', action: 'password changed' }]);
  });

  it('handles errors on the password field', async () => {
    setup(new AuthenticationError(400, { password: { minLength: 'minLength' } }));

    await execute();

    expect(store.select(selectAuthenticationFieldError, AuthenticationField.password)).not.toEqual(undefined);
  });

  it("fails to change the users's password", async () => {
    setup(new Error('nope'));

    await execute();

    expect(notificationGateway.warning).toHaveBeenCalledWith([
      "Une erreur s'est produite, votre mot de passe n'a pas été mis à jour",
    ]);
  });
});
