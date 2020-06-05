import React from 'react';

import TextField, { TextFieldProps } from 'src/components/TextField';

import { Form } from '../types';

import { Collapse } from '@material-ui/core';

type PasswordFieldProps = TextFieldProps & {
  form: Form;
};

const PasswordField: React.FC<PasswordFieldProps> = ({ form, ...props }) => (
  <Collapse in={form !== 'emailLogin'}>
    <TextField
      required={form !== 'emailLogin'}
      label="Mot de passe"
      {...props}
    />
  </Collapse>
);

export default PasswordField;
