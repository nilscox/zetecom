import React, { useState } from 'react';

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

import { ViewProps } from '../Popup';

const SignupView: React.FC<ViewProps> = () => {
  const [didAcceptRules, setDidAcceptRules] = useState(false);

  return (
    <>
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
          acceptRules: <AcceptRulesCheckbox onChange={setDidAcceptRules} />
        }}
        submitButtonValue="Inscription"
        isValid={didAcceptRules}
      />
    </>
  );
};

export default SignupView;