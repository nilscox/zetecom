import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';

import AsyncContent from 'src/components/AsyncContent';
import Padding from 'src/components/Padding';
import { useTrackEvent } from 'src/contexts/TrackingContext';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { User } from 'src/types/User';
import track from 'src/utils/track';

const useErrorMessage = (status: (s: number) => boolean) => {
  if (status(403)) {
    return 'Vous êtes déjà connecté.';
  }

  if (status(401)) {
    return "Le lien que vous avez utilisé n'est pas valide.";
  }

  return "Quelque chose s'est mal passé, veuillez réessayer.";
};

const EmailLogin: React.FC = () => {
  const trackEvent = useTrackEvent();

  const { token } = useQueryString();
  const [, setUser] = useUser();

  const [{ loading, error, status, data: user }] = useAxios(
    {
      method: 'POST',
      url: '/api/auth/email-login',
      data: { token },
    },
    undefined,
    User,
  );

  const errorMessage = useErrorMessage(status);

  useEffect(() => {
    if (status(200) && user) {
      setUser(user);
      trackEvent(track.emailLogin());
    }
  }, [status, user, setUser, trackEvent]);

  return (
    <AsyncContent
      loading={loading}
      render={() => (
        <Padding top>
          {status(200) && (
            <Typography>
              Vous êtes maintenant connecté.e. Vous pouvez changer votre mot de passe depuis la popup de l'extension.
            </Typography>
          )}

          {error && <Typography color="error">{errorMessage}</Typography>}
        </Padding>
      )}
    />
  );
};

export default EmailLogin;
