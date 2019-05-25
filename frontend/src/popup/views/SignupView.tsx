import React, { useState, useContext } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import UserContext from '../../utils/UserContext';
import { signupUser } from '../../api/user';
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
  | 'PASSWORD_UNSECURE'
  | 'UNKNOWN';

const ERROR_MSG: { [key in ERROR_TYPE]: string } = {
  EMAIL_INVALID_FORMAT: 'Format d\'adresse email invalide.',
  EMAIL_ALREADY_EXISTS: 'Cette adresse email est déjà utilisée.',
  NICK_TOO_SHORT: 'Ce pseudo est trop court.',
  NICK_TOO_LONG: 'Ce pseudo est trop long.',
  NICK_ALREADY_EXISTS: 'Ce pseudo est déjà utilisé.',
  PASSWORD_TOO_SHORT: 'Ce mot de passe est trop court.',
  PASSWORD_TOO_LONG: 'Ce mot de passe est trop long.',
  PASSWORD_UNSECURE: 'Ce mot de passe n\'est pas assez sécurisé.',
  UNKNOWN: 'Une erreur s\'est produite... :/',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrors = (body?: any): { [key: string]: string } => {
  if (!body)
    return {};

  const errors: {[key: string]: string} = {};

  if (body.email && body.email.isEmail)
    errors.email = ERROR_MSG.EMAIL_INVALID_FORMAT;
  if (body.message === 'EMAIL_ALREADY_EXISTS')
    errors.email = ERROR_MSG.EMAIL_ALREADY_EXISTS;

  if (body.nick && body.nick.minLength)
    errors.nick = ERROR_MSG.NICK_TOO_SHORT;
  if (body.nick && body.nick.maxLength)
    errors.nick = ERROR_MSG.NICK_TOO_LONG;
  if (body.message === 'NICK_ALREADY_EXISTS')
    errors.nick = ERROR_MSG.NICK_ALREADY_EXISTS;

  if (body.password && body.password.minLength)
    errors.password = ERROR_MSG.PASSWORD_TOO_SHORT;
  if (body.password && body.password.maxLength)
    errors.password = ERROR_MSG.PASSWORD_TOO_LONG;
  if (body.message === 'PASSWORD_UNSECURE')
    errors.password = ERROR_MSG.PASSWORD_UNSECURE;

  if (Object.keys(errors).length === 0)
    errors.global = ERROR_MSG.UNKNOWN;

  return errors;
};

const SignupView: React.FC<RouteComponentProps> = ({ history }) => {
  const [didAcceptRules, setDidAcceptRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>(getErrors());
  const { setUser } = useContext(UserContext);

  const signupSubmit = async (values: { [field: string]: string }) => {
    setLoading(true);

    const data = {
      email: values.email,
      password: values.password,
      nick: values.nick,
    };

    try {
      const user = await signupUser(data);
      setUser(user);
      history.push('/popup/signup/post-signup');
    } catch (e) {
      setErrors(getErrors(e.body));
    } finally {
      setLoading(false);
    }
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
            au moins <Link to="/" target="_blank">la page de présentation</Link>, ainsi que{' '}
            <Link to="/charte" target="_blank">la charte</Link>.
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
