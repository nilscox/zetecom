import React, { useState, useContext, useEffect } from 'react';

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

import WormholeContext from '../contexts/WormholeContext';

const SignupView: React.FC = () => {
  const [didAcceptRules, setDidAcceptRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const wormhole = useContext(WormholeContext);

  useEffect(() => {
    if (!wormhole)
      return;

    wormhole.onEvent('SIGNUP_SUCCESS', () => setLoading(false));
    wormhole.onEvent('SIGNUP_FAILURE', () => setLoading(false));
  }, []);

  const signupSubmit = (values: { [field: string]: string }) => {
    if (!wormhole)
      return;

    setLoading(true);

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
    </>
  );
};

export default SignupView;
