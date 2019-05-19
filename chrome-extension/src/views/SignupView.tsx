import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

  return <input type="checkbox" checked={value} onChange={handleChange} />;
};

const SignupView: React.FC<RouteComponentProps> = ({ history }) => {
  const [didAcceptRules, setDidAcceptRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const wormhole = useContext(WormholeContext);

  const signupSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

    wormhole.onEvent('SIGNUP_SUCCESS', () => history.push('/signup/post-signup'));
    wormhole.onEvent('SIGNUP_FAILURE', () => setLoading(false));

    wormhole.postEvent({
      type: 'SIGNUP',
      email: values.email,
      password: values.password,
      nick: values.nick,
    });
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
            email: { type: 'email', placeholder: 'Email' },
            password: { type: 'password', placeholder: 'Mot de passe' },
            nick: { type: 'text', placeholder: 'Pseudo' },
            acceptRules: <AcceptRulesCheckbox onChange={setDidAcceptRules} />,
          }}
          submitButtonValue="Inscription"
          isValid={didAcceptRules}
          isLoading={loading}
          onSubmit={signupSubmit}
        />
      </div>
    </>
  );
};

export default SignupView;
