import React from 'react';

import { Collapse } from '@material-ui/core';

import Input, { InputProps } from 'src/components/Input';

import { Form } from '../types';

type PasswordFieldProps = InputProps & {
  form: Form;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ form, ...props }) => (
  <Collapse in={form !== 'emailLogin'}>
    <Input fullWidth required={form !== 'emailLogin'} variant="outlined" placeholder="Mot de passe" {...props} />
  </Collapse>
);

export default PasswordField;
