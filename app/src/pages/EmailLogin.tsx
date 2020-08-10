import React, { useEffect } from 'react';

import { Box, Typography } from '@material-ui/core';

import AsyncContent from 'src/components/AsyncContent';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseUser } from 'src/types/User';
import { trackEmailLogin } from 'src/utils/track';

const useErrorMessage = (status: (s: number) => boolean) => {
  if (status(403))
    return 'Vous êtes déjà connecté.';

  if (status(401))
    return 'Le lien que vous avez utilisé n\'est pas valide.';

  return 'Quelque chose s\'est mal passé, veuillez réessayer.';
};

const EmailLogin: React.FC = () => {
  const { token } = useQueryString();
  const [, setUser] = useUser();

  const [{ loading, error, status, data: user }] = useAxios({
    method: 'POST',
    url: '/api/auth/email-login',
    data: { token },
  }, parseUser);

  const errorMessage = useErrorMessage(status);

  useEffect(() => {
    if (status(200) && user) {
      setUser(user);
      trackEmailLogin();
    }
  }, [status, user, setUser]);

  return (
    <AsyncContent loading={loading}>
      {() => (
        <Box mt={16}>

          { status(200) && (
            <Typography>
              Vous êtes maintenant connecté.e. Vous pouvez changer votre mot de passe depuis la popup de l'extension.
            </Typography>
          ) }

          { error && <Typography color="error">{ errorMessage }</Typography> }

        </Box>
      )}
    </AsyncContent>
  );
};

export default EmailLogin;
