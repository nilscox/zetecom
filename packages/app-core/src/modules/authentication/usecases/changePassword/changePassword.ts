import { AuthenticationField } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
// eslint-disable-next-line import/no-internal-modules
import { setChangePasswordFieldVisible } from '../../../extension/actions';
import { setAuthenticationField, setIsChangingPassword } from '../../actions';
import { handleAuthenticationError } from '../index';

export const changePassword = createThunk(
  async ({ dispatch, userGateway, notificationGateway, trackingGateway }, email: string) => {
    try {
      dispatch(setIsChangingPassword(true));

      await userGateway.changePassword(email);

      dispatch(setAuthenticationField(AuthenticationField.password, ''));
      dispatch(setChangePasswordFieldVisible(false));

      notificationGateway.success('Votre mot de passe a bien été mis à jour.');

      trackingGateway.track({
        category: 'authentication',
        action: 'password changed',
      });
    } catch (e) {
      try {
        dispatch(handleAuthenticationError(e));
      } catch {
        // todo: sentry
        notificationGateway.warning("Une erreur s'est produite, votre mot de passe n'a pas été mis à jour");
      }
    } finally {
      dispatch(setIsChangingPassword(false));
    }
  },
);
