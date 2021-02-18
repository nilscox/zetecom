import React from 'react';

import Collapse from 'src/components/layout/Collapse/Collapse';

import AuthenticationFormInput from '../AuthenticationFormInput/AuthenticationFormInput';

type PasswordFieldProps = {
  display: boolean;
  placeholder: string;
  value: string;
  required?: boolean;
  error?: React.ReactNode;
  onChange: (event: React.ChangeEvent) => void;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ display, ...props }) => (
  <Collapse in={display}>
    <AuthenticationFormInput
      outlined
      type="password"
      tabIndex={display ? undefined : -1}
      required={display}
      {...props}
    />
  </Collapse>
);

export default PasswordField;
