import React from 'react';

import AuthenticationFormInput from '../AuthenticationFormInput/AuthenticationFormInput';

type EmailFieldProps = {
  placeholder: string;
  value: string;
  error?: React.ReactNode;
  onChange: (event: React.ChangeEvent) => void;
};

// prettier-ignore
const EmailField: React.FC<EmailFieldProps> = props => (
  <AuthenticationFormInput outlined type="email" {...props} />
);

export default EmailField;
