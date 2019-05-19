import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { LoginFailure } from '../types/Wormhole';
import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';
import WormholeContext from '../contexts/WormholeContext';

type ERROR_TYPE =
  | 'INVALID_EMAIL_FORMAT'
  | 'INVALID_CREDENTIALS'
  | 'UNKNOWN';

const GLOBAL_ERROR_MSG: {[key in ERROR_TYPE]: string | null} = {
  INVALID_EMAIL_FORMAT: null,
  INVALID_CREDENTIALS: 'Identifiants invalides.',
  UNKNOWN: 'Une erreur s\'est produite... :/',
};

const LoginView: React.FC<RouteComponentProps> = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ERROR_TYPE | null>(null);
  const wormhole = useContext(WormholeContext);
  const globalErrorMessage = error && GLOBAL_ERROR_MSG[error] || undefined;

  const loginSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

    wormhole.onEvent('LOGIN_SUCCESS', () => history.push('/logout'));
    wormhole.onEvent('LOGIN_FAILURE', (event: LoginFailure) => {
      setLoading(false);

      if (!event.error || !event.error.body)
        return setError('UNKNOWN');

      const { body } = event.error;

      if (body.email && body.email.isEmail)
        setError('INVALID_EMAIL_FORMAT');
      else if (body.message === 'INVALID_CREDENTIALS')
        setError('INVALID_CREDENTIALS');
      else
        setError('UNKNOWN');
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
              errorMessage: error === 'INVALID_EMAIL_FORMAT'
                ? 'Format d\'adresse email invalide'
                : undefined,
            },
            password: { type: 'password', placeholder: 'Mot de passe' },
          }}
          globalErrorMessage={globalErrorMessage}
          submitButtonValue="Connexion"
          isLoading={loading}
          onSubmit={loginSubmit}
        />
      </div>
    </>
  );
};

export default LoginView;
