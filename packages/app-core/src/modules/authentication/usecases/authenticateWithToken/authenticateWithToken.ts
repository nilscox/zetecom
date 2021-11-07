import { validate as validateUUID } from 'uuid';

import { AuthenticationError } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setAuthenticatedUser } from '../index';

export const authenticateWithToken = createThunk(
  async ({ dispatch, userGateway, notificationGateway, trackingGateway }, token: string) => {
    if (!validateUUID(token)) {
      notificationGateway.error("Le jeton présent dans le lien n'est pas valide.");
      return;
    }

    try {
      const userDto = await userGateway.authenticateWithToken(token);

      await dispatch(setAuthenticatedUser(userDto));
      notificationGateway.success(`Vous êtes maintenant connecté.e en tant que ${userDto.nick}.`);

      trackingGateway.track({
        category: 'authentication',
        action: 'login with token',
      });
    } catch (e) {
      if (!(e instanceof AuthenticationError)) {
        throw e;
      }

      if (e.status === 401 && e.body.message === 'INVALID_EMAIL_LOGIN_TOKEN') {
        notificationGateway.error("Le lien de connexion n'est pas valide.");
        return;
      }

      throw e;
    }
  },
);
