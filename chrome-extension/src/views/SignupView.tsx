import React, { useState } from 'react';

import Form from '../components/Form';

type AcceptRulesCheckbox = {
  onChange: (value: boolean) => void;
};

const AcceptRulesCheckbox: React.FC<AcceptRulesCheckbox> = ({ onChange }) => {
  const [value, setValue] = useState(false);

  const handleChange = (e: React.SyntheticEvent) => {
    setValue((e.target as any).checked);
    onChange((e.target as any).checked);
  };

  return <input type="checkbox" checked={value} onChange={handleChange} />;
};

const SignupView: React.FC = () => {
  const [didAcceptRules, setDidAcceptRules] = useState(false);

  return (
    <>
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
