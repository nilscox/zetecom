import React, { useState, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useSignupUser } from 'src/api/user';
import UserContext from 'src/utils/UserContext';
import { useTheme } from 'src/utils/Theme';

import Button from 'src/components/common/Button';
import Box from 'src/components/common/Box';

import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form, { useFormErrors, GlobalErrorHandler, FieldErrorsHandler } from '../components/Form';
import FormError from '../components/FormError';

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
      <Typography
        style={{
          fontSize: '0.9rem',
          display: 'inline',
          marginLeft: 5,
        }}
      >
        J&apos;accepte la charte de CDV.
      </Typography>
    </div>
  );
};

const getGlobalError: GlobalErrorHandler = (error: AxiosError) => {
  if (!error || !error.isAxiosError)
    return null;

  if (error.response.status === 401)
    return 'Combinaison email / mot de passe non valide';

  if (error.response.status !== 400)
    return null;

  const { message } = error.response.data;

  if (message === 'PASSWORD_UNSECURE')
    return 'Ce mot de passe n\'est pas assez sécurisé.';

  if (message === 'NICK_ALREADY_EXISTS')
    return 'Ce pseudo est déjà utilisé.';

  if (message === 'EMAIL_ALREADY_EXISTS')
    return 'Cette adresse email est déjà utilisée.';

  return null;
};

const getFieldErrors: FieldErrorsHandler = (error: AxiosError) => {
  if (!error || !error.isAxiosError || error.response.status !== 400)
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
    }), {} as any);
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

  console.log(globalError);
  return (
    <>
      <ViewHeader />

      <div style={{ padding: '0 40px' }}>

        <Box my={big}>
          <Typography>
            <>
              Pour créer votre compte sur CDV, c'est par ici. Avant de vous inscrire, veillez à
              avoir lu au moins <Link to="/" target="_blank">la page de présentation</Link>, ainsi
              que{' '} <Link to="/charte" target="_blank">la charte</Link>.
            </>
          </Typography>
        </Box>

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
            nick: {
              type: 'text',
              placeholder: 'Pseudo',
              errorMessage: errors.nick,
            },
            acceptRules: <AcceptRulesCheckbox onChange={setDidAcceptRules} />,
          }}
          isValid={isFormValid}
          onChange={resetErrors}
          onSubmit={signupSubmit}
        >

          { globalError && <FormError>{ globalError }</FormError> }

          <Box my={big} style={{ alignSelf: 'center' }}>
            <Button type="submit" size="big" loading={loading} disabled={!isFormValid}>Inscription</Button>
          </Box>

        </Form>

      </div>
    </>
  );
};

export default SignupView;
