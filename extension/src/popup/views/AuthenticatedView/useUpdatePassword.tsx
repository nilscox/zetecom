import { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from 'src/hooks/use-axios';

import { createFormErrorsHandler } from '../../utils/createFormErrorsHandler';

const useUpdatePasswordErrors = createFormErrorsHandler({
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

const useUpdatePassword = () => {
  const opts: AxiosRequestConfig = { method: 'PUT', url: '/api/auth/change-password' };
  const [{ error, loading, status }, updatePassword] = useAxios(opts, () => undefined, { manual: true });
  const errors = useUpdatePasswordErrors(error);

  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    if (status(200))
      setPasswordChanged(true);
  }, [status]);

  const handleUpdatePassord = (password: string) => {
    setPasswordChanged(false);

    updatePassword({
      data: { password },
    });
  };

  return [handleUpdatePassord, { loading, errors, passwordChanged }] as const;
};

export default useUpdatePassword;
