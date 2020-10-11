import React, { useEffect } from 'react';

import { Typography } from '@material-ui/core';
import { AxiosError } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AsyncContent from 'src/components/AsyncContent';
import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { User } from 'src/types/User';
import { trackEmailValidated } from 'src/utils/track';

const useErrorMessage = (status: (s: number) => boolean, error?: AxiosError) => {
  if (status(403)) {
    return 'Votre adresse email est déjà validée.';
  }

  if (status(400) && error?.response?.data.message === 'USER_EMAIL_TOKEN_NOT_FOUND') {
    return "Le lien que vous avez utilisé n'est pas valide.";
  }

  return "Quelque chose s'est mal passé, veuillez réessayer plus tard.";
};

const EmailValidation: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [, setUser] = useUser();
  const history = useHistory();

  const [{ loading, error, status, data: user }] = useAxios(
    {
      method: 'POST',
      url: `/api/auth/email-validation/${token}`,
    },
    undefined,
    User,
  );

  const errorMessage = useErrorMessage(status, error);

  useEffect(() => {
    if (status(201) && user) {
      setUser(user);
      trackEmailValidated();
      toast.success('Votre adresse email a été validée ! 🎉');
      history.push('/');
    }
  }, [status, user, setUser, history]);

  return (
    <AsyncContent loading={loading} render={() => error && <Typography color="error">{errorMessage}</Typography>} />
  );
};

export default EmailValidation;
