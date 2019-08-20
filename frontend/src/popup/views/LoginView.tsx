import { AxiosError } from 'axios';
import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';

import UserContext from 'src/utils/UserContext';
import { useLoginUser } from 'src/api/user';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';

import Form, { useFormErrors } from '../components/Form';
import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';

const getGlobalError = (error: AxiosError) => {
  if (!error || !error.isAxiosError)
    return null;

  const { response: { status, data: { message } } } = error;

  if (status === 401 && message === 'INVALID_CREDENTIALS')
    return 'Combinaison email / mot de passe non valide';

  if (status === 401 && message === 'EMAIL_NOT_VALIDATED')
    return 'Votre adresse email n\'a pas été validée, verifiez dans vos spams !';

  return null;
};

const getFieldErrors = (error: AxiosError) => {
  if (!error || !error.isAxiosError || error.response.status !== 400)
    return null;

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
  const { setUser } = useContext(UserContext);
  const [login, { loading, error }] = useLoginUser();
  const { sizes: { big } } = useTheme();
  const [globalError, fieldErrors, resetErrors, errorsHandled] = useFormErrors(error, getGlobalError, getFieldErrors);
  const errors = fieldErrors || {};

  const onSubmit = async (values: { [fields: string]: string }) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };

    const user = await login(credentials);

    setUser(user);
    history.push('/popup/logout');
  };

  const isFormValid = (values: { [field: string]: string }) => {
    return values.email.length > 0 && values.password.length > 0;
  };

  if (!loading && error && !errorsHandled)
    throw error;

  return (
    <>

      <ViewHeader />

      <div style={{ padding: '0 40px' }}>

        <Box my={big}>
          <Typography>
            Connectez-vous sur CDV pour interagir avec le reste de la communauté.
          </Typography>
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

      </div>
    </>
  );
};

export default LoginView;
