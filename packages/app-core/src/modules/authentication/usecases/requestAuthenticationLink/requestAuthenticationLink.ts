import { createThunk } from '../../../../store/createThunk';
import { selectAuthenticatedUser } from '../..';
import { setAuthenticationGlobalError, setIsAuthenticating } from '../../actions';
import { handleAuthenticationError } from '../index';

export const requestAuthenticationLink = createThunk(
  async (
    { getState, dispatch, userGateway, notificationGateway, trackingGateway },
    email: string,
    location: 'app' | 'popup',
  ) => {
    if (selectAuthenticatedUser(getState())) {
      return dispatch(setAuthenticationGlobalError('Vous êtes déjà connecté.e.'));
    }

    try {
      dispatch(setIsAuthenticating(true));

      await userGateway.requestAuthenticationLink(email);
      notificationGateway.success(`Un email contenant un lien de connexion vient d'être envoyé à l'adresse ${email}.`);

      trackingGateway.track({
        category: 'authentication',
        action: 'request authentication link',
        name: `request authentication link from ${location}`,
      });
    } catch (e) {
      dispatch(handleAuthenticationError(e));
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  },
);
