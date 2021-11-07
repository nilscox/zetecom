import { createThunk } from '../../../../store/createThunk';
import { selectAuthenticatedUser } from '../..';
import { setAuthenticationGlobalError, setIsAuthenticating } from '../../actions';
import { handleAuthenticationError, setAuthenticatedUser } from '../index';

export const signup = createThunk(
  async (
    { getState, dispatch, userGateway, routerGateway, notificationGateway, trackingGateway },
    email: string,
    password: string,
    nick: string,
    location: 'app' | 'popup',
  ) => {
    if (selectAuthenticatedUser(getState())) {
      return dispatch(setAuthenticationGlobalError('Vous êtes déjà connecté.e.'));
    }

    try {
      dispatch(setIsAuthenticating(true));

      const { requiresEmailValidation, ...userDto } = await userGateway.signup(email, password, nick);

      trackingGateway.track({
        category: 'authentication',
        action: 'signup',
        name: `signup from ${location}`,
      });

      if (requiresEmailValidation) {
        notificationGateway.success(`Pour finaliser votre inscription, un email vous a été envoyé à ${userDto.email}`);
      } else {
        await dispatch(setAuthenticatedUser(userDto));

        notificationGateway.success('Bienvenue ! 🎉');

        if (location === 'app') {
          routerGateway.push('/');
        }
      }
    } catch (error) {
      dispatch(handleAuthenticationError(error));
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  },
);
