import { createThunk } from '../../../../store/createThunk';
import { setIsChangingPassword } from '../../actions';
import { handleAuthenticationError } from '../index';

export const changePassword = createThunk(async ({ dispatch, userGateway, notificationGateway }, email: string) => {
  try {
    dispatch(setIsChangingPassword(true));

    await userGateway.changePassword(email);
    notificationGateway.success('Votre mot de passe a bien été mis à jour.');
  } catch (e) {
    try {
      console.log(e);
      dispatch(handleAuthenticationError(e));
    } catch {
      // todo: sentry
      notificationGateway.warning("Une erreur s'est produite, votre mot de passe n'a pas été mis à jour");
    }
  } finally {
    dispatch(setIsChangingPassword(false));
  }
});
