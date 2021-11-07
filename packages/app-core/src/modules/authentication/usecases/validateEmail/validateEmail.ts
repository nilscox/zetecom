import { validate as validateUUID } from 'uuid';

import { AuthenticationError } from '../../../../entities';
import { createThunk } from '../../../../store/createThunk';
import { setAuthenticatedUser } from '../index';

export const validateEmail = createThunk(
  async ({ dispatch, userGateway, notificationGateway, trackingGateway }, token: string) => {
    if (!validateUUID(token)) {
      notificationGateway.error("Le jeton présent dans le lien n'est pas valide.");
      return;
    }

    try {
      const result = await userGateway.validateEmail(token);

      await dispatch(setAuthenticatedUser(result));
      notificationGateway.success('Votre adresse email a bien été validée ! Bienvenue 🎉');

      trackingGateway.track({
        category: 'authentication',
        action: 'email validated',
      });
    } catch (e) {
      if (e instanceof AuthenticationError) {
        if (e.status === 400 && e.body.message === 'USER_EMAIL_TOKEN_NOT_FOUND') {
          notificationGateway.error("Le lien de validation d'adresse email n'est pas valide.");
          return;
        }

        if (e.status === 400 && e.body.message === 'EMAIL_ALREADY_VALIDATED') {
          notificationGateway.error('Votre adresse email a déjà été validée.');
          return;
        }
      }

      // sentry
      notificationGateway.error(
        "Quelque chose s'est mal passé, votre adresse email n'a pas pu être validée. Veuillez réessayer plus tard...",
      );
    }
  },
);
