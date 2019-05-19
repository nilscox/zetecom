import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { SignupFailure } from '../types/Wormhole';
import WormholeContext from '../contexts/WormholeContext';
import ViewHeader from '../components/ViewHeader';
import Typography from '../components/Typography';
import Form from '../components/Form';

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

type ERROR_TYPE =
  | 'EMAIL_INVALID_FORMAT'
  | 'EMAIL_ALREADY_EXISTS'
  | 'NICK_TOO_SHORT'
  | 'NICK_TOO_LONG'
  | 'NICK_ALREADY_EXISTS'
  | 'PASSWORD_TOO_SHORT'
  | 'PASSWORD_TOO_LONG'
  | 'UNKNOWN';

const ERROR_MSG: { [key in ERROR_TYPE]: string } = {
  EMAIL_INVALID_FORMAT: 'Format d\'adresse email invalide.',
  EMAIL_ALREADY_EXISTS: 'Cette adresse email est déjà utilisée.',
  NICK_TOO_SHORT: 'Ce pseudo est trop court.',
  NICK_TOO_LONG: 'Ce pseudo est trop long.',
  NICK_ALREADY_EXISTS: 'Ce pseudo est déjà utilisé.',
  PASSWORD_TOO_SHORT: 'Ce mot de passe est trop court.',
  PASSWORD_TOO_LONG: 'Ce mot de passe est trop long.',
  UNKNOWN: 'Une erreur s\'est produite... :/',
};

// eslint-disable-next-line max-statements
const getErrors = (event?: SignupFailure): { [key: string]: string } => {
  if (!event)
    return {};

  if (!event.error || !event.error.body)
    return { global: ERROR_MSG.UNKNOWN };

  const { body } = event.error;
  const errors: {[key: string]: string} = {};

  if (body.email && body.email.isEmail)
    errors.email = ERROR_MSG.EMAIL_INVALID_FORMAT;

  if (body.nick && body.nick.minLength)
    errors.nick = ERROR_MSG.NICK_TOO_SHORT;
  if (body.nick && body.nick.maxLength)
    errors.nick = ERROR_MSG.NICK_TOO_LONG;

  if (body.password && body.password.minLength)
    errors.password = ERROR_MSG.PASSWORD_TOO_SHORT;
  if (body.password && body.password.maxLength)
    errors.password = ERROR_MSG.PASSWORD_TOO_LONG;

  if (Object.keys(errors).length === 0)
    errors.global = ERROR_MSG.UNKNOWN;

  return errors;
};

const SignupView: React.FC<RouteComponentProps> = ({ history }) => {
  const [didAcceptRules, setDidAcceptRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>(getErrors());
  const wormhole = useContext(WormholeContext);

  const signupSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

    wormhole.onEvent('SIGNUP_SUCCESS', () => history.push('/signup/post-signup'));
    wormhole.onEvent('SIGNUP_FAILURE', (event: SignupFailure) => {
      setLoading(false);
      setErrors(getErrors(event));
    });

    wormhole.postEvent({
      type: 'SIGNUP',
      email: values.email,
      password: values.password,
      nick: values.nick,
    });
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

  return (
    <>
      <ViewHeader />
      <div style={{ padding: '0 40px' }}>
        <Typography>
          <>
            Créez votre compte sur CDV. Avant de vous inscrire, veillez à avoir lu
            au moins <a href="#">la page de présentation</a>, ainsi que{' '}
            <a href="#">la charte</a>.
          </>
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
            nick: {
              type: 'text',
              placeholder: 'Pseudo',
              errorMessage: errors.nick,
            },
            acceptRules: <AcceptRulesCheckbox onChange={setDidAcceptRules} />,
          }}
          submitButtonValue="Inscription"
          globalErrorMessage={errors.global}
          isValid={isFormValid}
          isLoading={loading}
          onSubmit={signupSubmit}
        />
      </div>
    </>
  );
};

export default SignupView;
