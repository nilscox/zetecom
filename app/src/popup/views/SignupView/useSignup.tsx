import React, { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';

import { useUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import WebsiteLink from 'src/popup/components/WebsiteLink';
import { parseUser } from 'src/types/User';

import { createFormErrorsHandler } from '../../utils/createFormErrorsHandler';

const useSignupErrors = createFormErrorsHandler({
  nick: ({ response: { status, data } }) => {
    if (status !== 400)
      return;

    if (data.nick?.minLength)
      return 'Ce pseudo est trop court.';

    if (data.nick?.maxLength)
      return 'Ce pseudo est trop long.';

    if (data.message === 'NICK_ALREADY_EXISTS')
      return 'Ce pseudo est déjà utilisé.';
  },
  email: ({ response: { status, data } }) => {
    if (status === 401 && data.message === 'EMAIL_NOT_AUTHORIZED') {
      return (
        <>
          Les inscriptions ne sont pas encore ouvertes.<br />
          Si vous souhaitez participer à la beta, <WebsiteLink to="/faq.html#contact">contactez nous</WebsiteLink> pour
          autoriser votre adresse email.
        </>
      );
    }

    if (status !== 400)
      return;

    if (data.email?.isEmail)
      return 'Format d\'adresse email invalide.';

    if (data.message === 'EMAIL_ALREADY_EXISTS')
      return 'Cette adresse email est déjà utilisée.';
  },
  password: ({ response: { status, data } }) => {
    if (status !== 400)
      return;

    if (data.password?.minLength)
      return 'Ce mot de passe est trop court.';

    if (data.password?.maxLength)
      return 'Ce mot de passe est trop long... :o';

    if (data.message === 'PASSWORD_UNSECURE')
      return 'Ce mot de passe n\'est pas assez sécurisé.';
  },
});

const useSignup = () => {
  const [, setUser] = useUser();
  const history = useHistory();

  const opts: AxiosRequestConfig = { method: 'POST', url: '/api/auth/signup' };
  const [{ data: user, loading, error, status }, signup] = useAxios(opts, parseUser, { manual: true });

  const errors = useSignupErrors(error);

  useEffect(() => {
    if (status(201))
      setUser(user);
  }, [status, user, setUser, history]);

  const handleSignup = (nick: string, email: string, password: string) => {
    signup({ data: { nick, email, password } });
  };

  return [
    handleSignup,
    { loading, errors, emailSent: status(201) },
  ] as const;
};

export default useSignup;
