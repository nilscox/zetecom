import { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';

import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

import Form, { useFormErrors } from '../components/Form';
import ViewHeader from '../components/ViewHeader';
import useAxios from 'src/hooks/use-axios';
import { parseUser } from 'src/types/User';
import useUser from 'src/hooks/use-user';

const getGlobalError = (error: AxiosError) => {
  if (!error || !error.response)
    return;

  const { response: { status, data: { message } } } = error;

  if (status === 401 && message === 'INVALID_CREDENTIALS')
    return 'Combinaison email / mot de passe non valide';

  if (status === 401 && message === 'EMAIL_NOT_VALIDATED')
    return 'Votre adresse email n\'a pas été validée, verifiez dans vos spams !';
};

const getFieldErrors = (error: AxiosError) => {
  if (!error || !error.response || error.response.status !== 400)
    return;

  const fields = error.response.data;

  const getErrorMessage = (field: string, obj: { [key: string]: string }) => {
    const constraint = Object.keys(obj)[0];

    if (field === 'email' && constraint === 'isEmail')
      return 'Format d\'adresse email non valide';
  };

  return Object.keys(fields)
    .reduce((errors, field) => ({
      [field]: getErrorMessage(field, fields[field]),
      ...errors,
    }), {});
};

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const [currentUser, setUser] = useUser();
  const { sizes: { big } } = useTheme();

  const opts = { method: 'POST', url: '/api/auth/login', withCredentials: true };
  const [{ data: user, loading, error, status }, login] = useAxios(opts, parseUser, { manual: true });

  const [globalError, errors = {}, resetErrors] = useFormErrors(error, getGlobalError, getFieldErrors);

  const onSubmit = (values: { [fields: string]: string }) => login({
    data: {
      email: values.email,
      password: values.password,
    },
  });

  useEffect(() => {
    if (status(200)) {
      setUser(user);
      history.push('/popup/logout');
    }
  }, [status, user, setUser, history]);

  const isFormValid = (values: { [field: string]: string }) => {
    return values.email.length > 0 && values.password.length > 0;
  };

  if (currentUser)
    return <Redirect to="/popup/logout" />;

  return (
    <>

      <ViewHeader />

      <Box px={4 * big}>

        <Box my={big}>
          <Text>
            Connectez-vous sur Réagir à l'information pour interagir avec le reste de la communauté.
          </Text>
        </Box>

        <Form
          loading={loading}
          globalError={globalError}
          submitButtonValue="Connexion"
          onChange={resetErrors}
          isValid={isFormValid}
          onSubmit={onSubmit}
          fields={{
            email: {
              type: 'email',
              placeholder: 'Email',
              errorMessage: errors.email,
            },
            password: {
              type: 'password',
              placeholder: 'Mot de passe',
              errorMessage: errors.password,
            },
          }}
        />

      </Box>
    </>
  );
};

export default LoginView;
