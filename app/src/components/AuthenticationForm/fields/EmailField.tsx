import React from 'react';

import TextField, { TextFieldProps } from 'src/components/TextField';

type EmailFieldProps = TextFieldProps;

const EmailField: React.FC<EmailFieldProps> = (props) => (
  <TextField
    required
    label="Adresse email"
    {...props}
  />
);

export default EmailField;
