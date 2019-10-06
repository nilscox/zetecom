import React, { useState, useContext, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

import { parseUser } from 'src/types/User';
import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

import useAxios from 'src/hooks/use-axios';

import ViewHeader from '../components/ViewHeader';
import Form, { useFormErrors, GlobalErrorHandler, FieldErrorsHandler } from '../components/Form';

type AcceptRulesCheckbox = {
  onChange: (value: boolean) => void;
};

const AcceptRulesCheckbox: React.FC<AcceptRulesCheckbox> = ({ onChange }) => {
  const [value, setValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked);
    onChange(e.target.checked);
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        style={{ verticalAlign: 'middle' }}
      />
      <Text
        style={{
          fontSize: '0.9rem',
          display: 'inline',
          marginLeft: 5,
        }}
      >
        J&apos;accepte la charte.
      </Text>
    </div>
  );
};

const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.response)
    return;

  const { response: { status, data: { message } } } = error;

  if (status === 401 && message === 'EMAIL_NOT_AUTHORIZED') {
    return (
      <>
        Les inscriptions ne sont pas encore ouvertes.<br />
        Si vous souhaitez participer à la beta, <a href="/faq#contact" target="_blank">contactez nous</a> pour autoriser
        votre adresse email.
      </>
    );
  }

  if (status === 400 && message === 'PASSWORD_UNSECURE')
    return 'Ce mot de passe n\'est pas assez sécurisé.';

  if (status === 400 && message === 'NICK_ALREADY_EXISTS')
    return 'Ce pseudo est déjà utilisé.';

  if (status === 400 && message === 'EMAIL_ALREADY_EXISTS')
    return 'Cette adresse email est déjà utilisée.';
};

const getFieldErrors: FieldErrorsHandler = (error: AxiosError) => {
  if (!error || !error.response || error.response.status !== 400)
    return;

  const fields = error.response.data;

  const getErrorMessage = (field: string, obj: { [key: string]: string }) => {
    const constraint = Object.keys(obj)[0];

    if (field === 'email' && constraint === 'isEmail')
      return 'Format d\'adresse email invalide.';

    if (field === 'nick' && constraint === 'minLength')
      return 'Ce pseudo est trop court.';

    if (field === 'nick' && constraint === 'maxLength')
      return 'Ce pseudo est trop long.';

    if (field === 'password' && constraint === 'minLength')
      return 'Ce mot de passe est trop court.';

    if (field === 'password' && constraint === 'maxLength')
      return 'Ce mot de passe est trop long... :o';
  };

  return Object.keys(fields)
    .reduce((errors, field) => ({
      [field]: getErrorMessage(field, fields[field]),
      ...errors,
    }), {});
};

const SignupView: React.FC<RouteComponentProps> = ({ history }) => {
  const { sizes: { big } } = useTheme();
  const [didAcceptRules, setDidAcceptRules] = useState(false);
  const { setUser } = useContext(UserContext);

  const opts = { method: 'POST', url: '/api/auth/signup', withCredentials: true };
  const [{ data: user, loading, error, status }, signup] = useAxios(opts, parseUser, { manual: true });

  const [globalError, errors = {}, resetErrors] = useFormErrors(error, getGlobalError, getFieldErrors);

  const submitSignup = async (values: { [field: string]: string }) => signup({
    data: {
      email: values.email,
      password: values.password,
      nick: values.nick,
    },
  });

  useEffect(() => {
    if (status(201)) {
      setUser(user);
      history.push('/popup/signup/post-signup');
    }
  }, [status, user, setUser, history]);

  const isFormValid = (values: { [field: string]: string }) => {
    if (!didAcceptRules)
      return false;

    for (const field of ['email', 'password', 'nick']) {
      if (values[field].length === 0)
        return false;
    }

    return true;
  };

  return (
    <>
      <ViewHeader />

      <Box px={40}>

        <Box my={big}>
          <Text>
            <>
              Pour créer votre compte sur Réagir à l'information, c'est par ici. Avant de vous inscrire, veillez à avoir
              lu au moins <Link to="/" target="_blank">la page de présentation</Link>, ainsi que{' '}
              <Link to="/charte" target="_blank">la charte</Link>.
            </>
          </Text>
        </Box>

        <Form
          loading={loading}
          globalError={globalError}
          submitButtonValue="Inscription"
          isValid={isFormValid}
          onChange={resetErrors}
          onSubmit={submitSignup}
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
            nick: {
              type: 'text',
              placeholder: 'Pseudo',
              errorMessage: errors.nick,
            },
            acceptRules: <AcceptRulesCheckbox onChange={setDidAcceptRules} />,
          }}
        />

      </Box>
    </>
  );
};

export default SignupView;
