import React from 'react';

import { Collapse } from '@material-ui/core';

import TextField, { TextFieldProps } from 'src/components/TextField';

import { Form } from '../types';

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
