import React from 'react';

import Input, { InputProps } from 'src/components/Input';

type EmailFieldProps = InputProps;

const EmailField: React.FC<EmailFieldProps> = props => (
  <Input fullWidth required variant="outlined" placeholder="Adresse email" {...props} />
);

export default EmailField;
