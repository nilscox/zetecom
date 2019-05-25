import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { loginUser } from '../../api/user';
import UserContext from '../../utils/UserContext';
import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';

type ERROR_TYPE =
  | 'EMAIL_INVALID_FORMAT'
  | 'INVALID_CREDENTIALS'
  | 'UNKNOWN';

const ERROR_MSG: { [key in ERROR_TYPE]: string } = {
  EMAIL_INVALID_FORMAT: 'Format d\'adresse email invalide.',
  INVALID_CREDENTIALS: 'Identifiants invalides.',
  UNKNOWN: 'Une erreur s\'est produite... :/',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrors = (body?: any): { [key: string]: string } => {
  if (!body)
    return {};

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
  const { setUser } = useContext(UserContext);

  const isFormValid = (values: { [field: string]: string }) => {
    for (let field of ['email', 'password']) {
      if (values[field].length === 0)
        return false;
    }

    return true;
  };

  const loginSubmit = async (values: { [field: string]: string }) => {
    setLoading(true);

    const credentials = {
      email: values.email,
      password: values.password,
    };

    try {
      const user = await loginUser(credentials);
      setUser(user);
      history.push('/popup/logout');
    } catch (e) {
      setErrors(getErrors(e.body));
    } finally {
      setLoading(false);
    }
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
