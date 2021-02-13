import React from 'react';

import Collapse from 'src/components-v2/layout/Collapse/Collapse';

import AuthenticationFormInput from '../AuthenticationFormInput/AuthenticationFormInput';

type PasswordFieldProps = {
  display: boolean;
  placeholder: string;
  value: string;
  error?: React.ReactNode;
  onChange: (event: React.ChangeEvent) => void;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ display, ...props }) => (
  <Collapse in={display}>
    <AuthenticationFormInput outlined type="password" tabIndex={display ? undefined : -1} {...props} />
  </Collapse>
);

export default PasswordField;
