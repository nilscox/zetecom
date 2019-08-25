import React, { useState, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useSignupUser } from 'src/api/user';
import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';

import Box from 'src/components/common/Box';
import Text from 'src/components/common/Text';

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
        J&apos;accepte la charte de CDV.
      </Text>
    </div>
  );
};

const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.response)
    return null;

  const { response: { status, data: { message } } } = error;

  if (status === 400 && message === 'PASSWORD_UNSECURE')
    return 'Ce mot de passe n\'est pas assez sécurisé.';

  if (status === 400 && message === 'NICK_ALREADY_EXISTS')
    return 'Ce pseudo est déjà utilisé.';

  if (status === 400 && message === 'EMAIL_ALREADY_EXISTS')
    return 'Cette adresse email est déjà utilisée.';

  return null;
};

const getFieldErrors: FieldErrorsHandler = (error: AxiosError) => {
  if (!error || !error.response || error.response.status !== 400)
    return null;

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
  const [signup, { loading, error }] = useSignupUser();
  const [didAcceptRules, setDidAcceptRules] = useState(false);
  const [globalError, fieldErrors, resetErrors, handled] = useFormErrors(error, getGlobalError, getFieldErrors);
  const errors = fieldErrors || {};
  const { setUser } = useContext(UserContext);

  const signupSubmit = async (values: { [field: string]: string }) => {
    const user = await signup({
      email: values.email,
      password: values.password,
      nick: values.nick,
    });

    setUser(user);
    history.push('/popup/signup/post-signup');
  };

  const isFormValid = (values: { [field: string]: string }) => {
    if (!didAcceptRules)
      return false;

    for (let field of ['email', 'password', 'nick']) {
      if (values[field].length === 0)
        return false;
    }

    return true;
  };

  if (!loading && error && !handled)
    throw error;

  return (
    <>
      <ViewHeader />

      <Box px={40}>

        <Box my={big}>
          <Text>
            <>
              Pour créer votre compte sur CDV, c'est par ici. Avant de vous inscrire, veillez à
              avoir lu au moins <Link to="/" target="_blank">la page de présentation</Link>, ainsi
              que{' '} <Link to="/charte" target="_blank">la charte</Link>.
            </>
          </Text>
        </Box>

        <Form
          loading={loading}
          globalError={globalError}
          submitButtonValue="Inscription"
          isValid={isFormValid}
          onChange={resetErrors}
          onSubmit={signupSubmit}
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
