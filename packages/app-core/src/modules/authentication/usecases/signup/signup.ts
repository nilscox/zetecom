import { createThunk } from '../../../../store/createThunk';
import { selectAuthenticatedUser } from '../..';
import { setAuthenticationGlobalError, setIsAuthenticating } from '../../actions';
import { handleAuthenticationError, setAuthenticatedUser } from '../index';

export const signup = createThunk(
  async (
    { getState, dispatch, userGateway, routerGateway, notificationGateway },
    email: string,
    password: string,
    nick: string,
  ) => {
    if (selectAuthenticatedUser(getState())) {
      return dispatch(setAuthenticationGlobalError('Vous êtes déjà connecté.e.'));
    }

    try {
      dispatch(setIsAuthenticating(true));

      const { requiresEmailValidation, ...userDto } = await userGateway.signup(email, password, nick);

      if (requiresEmailValidation) {
        notificationGateway.success(`Pour finaliser votre inscription, un email vous a été envoyé à ${userDto.email}`);
      } else {
        await dispatch(setAuthenticatedUser(userDto));

        routerGateway.push('/');
        notificationGateway.success('Bienvenue ! 🎉');
      }
    } catch (error) {
      dispatch(handleAuthenticationError(error));
    } finally {
      dispatch(setIsAuthenticating(false));
    }
  },
);
