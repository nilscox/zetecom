import { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';
import track from 'src/utils/track';

import { createFormErrorsHandler } from '../../utils/createFormErrorsHandler';

const useChangePasswordErrors = createFormErrorsHandler({
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

const useChangePassword = () => {
  const opts: AxiosRequestConfig = { method: 'PUT', url: '/api/auth/change-password' };
  const [{ error, loading, status }, changePassword] = useAxios(opts, () => undefined, { manual: true });
  const errors = useChangePasswordErrors(error);

  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (status(200)) {
      setPasswordChanged(true);
      track('change-password');
    }
  }, [status]);

  useEffect(() => {
    if (passwordChanged) {
      const timeout = setTimeout(() => setPasswordChanged(false), 3000);

      return () => clearTimeout(timeout);
    }
  }, [passwordChanged]);

  const handleChangePassord = (password: string) => {
    setPasswordChanged(false);

    changePassword({
      data: { password },
    });
  };

  return [handleChangePassord, { loading, errors, passwordChanged }] as const;
};

export default useChangePassword;
