import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { LoginFailure } from '../types/Wormhole';
import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';

type ERROR_TYPE =
  | 'EMAIL_INVALID_FORMAT'
  | 'INVALID_CREDENTIALS'
  | 'UNKNOWN';

const ERROR_MSG: { [key in ERROR_TYPE]: string } = {
  EMAIL_INVALID_FORMAT: 'Format d\'adresse email invalide.',
  INVALID_CREDENTIALS: 'Identifiants invalides.',
  UNKNOWN: 'Une erreur s\'est produite... :/',
};

const getErrors = (event?: LoginFailure): { [key: string]: string } => {
  if (!event)
    return {};

  if (!event.error || !event.error.body)
    return { global: ERROR_MSG.UNKNOWN };

  const { body } = event.error;
  const errors: {[key: string]: string} = {};

  if (body.email && body.email.isEmail)
    errors.email = ERROR_MSG.EMAIL_INVALID_FORMAT;
  if (body.message === 'INVALID_CREDENTIALS')
    errors.global = ERROR_MSG.INVALID_CREDENTIALS;

  if (Object.keys(errors).length === 0)
    errors.global = ERROR_MSG.UNKNOWN;

  return errors;
};

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>(getErrors());
  const wormhole = useContext(WormholeContext);

  const isFormValid = (values: { [field: string]: string }) => {
    for (let field of ['email', 'password']) {
      if (values[field].length === 0)
        return false;
    }

    return true;
  };

  const loginSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

    wormhole.onEvent('LOGIN_SUCCESS', () => history.push('/logout'));
    wormhole.onEvent('LOGIN_FAILURE', (event: LoginFailure) => {
      setLoading(false);
      setErrors(getErrors(event));
    });

    wormhole.postEvent({
      type: 'LOGIN',
      email: values.email,
      password: values.password,
    });
  };

  return (
    <>
      <ViewHeader />
      <div style={{ padding: '0 40px' }}>
        <Typography>
          Connectez-vous sur CDV pour interagir avec le reste de la communauté.
        </Typography>
        <Form
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
          globalErrorMessage={errors.global}
          submitButtonValue="Connexion"
          isLoading={loading}
          isValid={isFormValid}
          onSubmit={loginSubmit}
        />
      </div>
    </>
  );
};

export default LoginView;
