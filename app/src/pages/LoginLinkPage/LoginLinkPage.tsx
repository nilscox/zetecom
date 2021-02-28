import React, { useEffect } from 'react';

import axios from 'axios';
import { useMutation } from 'react-query';
import { RouteComponentProps } from 'react-router';
import { toast } from 'react-toastify';

import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import { useTrackEvent } from 'src/contexts/trackingContext';
import { useSetUser } from 'src/contexts/userContext';
import track from 'src/domain/track';
import { User } from 'src/types/User';
import getFormErrors from 'src/utils/getFormErrors';

const linkLogin = async (token: string) => {
  try {
    const response = await axios.post<User>('/api/auth/email-login', { token });

    return response.data;
  } catch (error) {
    // todo: rename to getRequestError
    const [formError] = getFormErrors(error, {
      403: 'Vous êtes déjà connecté.e.',
      401: "Le lien que vous avez utilisé n'est pas valide.",
    });

    throw new Error(formError ?? "Quelque chose s'est mal passé, réessayez plus tard.");
  }
};

const useLinkLogin = (token: string) => {
  const setUser = useSetUser();
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: loading } = useMutation(() => linkLogin(token), {
    onSuccess: user => {
      setUser(user);
      trackEvent(track.linkLogin());
      toast.success(
        <>
          Vous êtes maintenant connecté.e
          <br />
          Vous pouvez changer votre mot de passe depuis la popup de l'extension.
        </>,
      );
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return [mutate, { loading }] as const;
};

const LoginLinkPage: React.FC<RouteComponentProps<{ token: string }>> = ({ match }) => {
  const { token } = match.params;

  const [linkLogin, { loading }] = useLinkLogin(token);

  useEffect(() => {
    linkLogin();
  }, [linkLogin]);

  return <AsyncContent loading={loading} render={() => null} />;
};

export default LoginLinkPage;
