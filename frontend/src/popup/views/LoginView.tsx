import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import UserContext from 'src/utils/UserContext';
import { useLoginUser } from 'src/api/user';
import { useTheme } from 'src/utils/Theme';
import Box from 'src/components/common/Box';
import Button from 'src/components/common/Button';
import FormError from 'src/components/common/FormError';

import Form, { useFormErrors } from '../components/Form';
import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';

const getGlobalError = (error: any) => {
  if (!error || !error.isAxiosError)
    return null;

  if (error.response.status === 401)
    return 'Combinaison email / mot de passe non valide';

  return null;
};

const getFieldErrors = (error: any) => {
  if (!error || !error.isAxiosError || error.response.status !== 400)
    return null;

  const fields = error.response.data;

  const getErrorMessage = (obj: any) => {
    const constraint = Object.keys(obj)[0];

    switch (constraint) {
    case 'isEmail':
      return 'Format d\'adresse email non valide';
    default:
      return 'Invalide';
    }
  };

  return Object.keys(fields)
    .reduce((errors, field) => ({
      [field]: getErrorMessage(fields[field]),
      ...errors,
    }), {} as any);
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
          onSubmit={onSubmit}
          errors={getFieldErrors(error)}
          onChange={resetErrors}
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
        >

          { globalError && <FormError>{ globalError }</FormError> }

          <Box my={big} style={{ alignSelf: 'center' }}>
            <Button type="submit" size="big" loading={loading}>Connexion</Button>
          </Box>

        </Form>

      </div>
    </>
  );
};

export default LoginView;
