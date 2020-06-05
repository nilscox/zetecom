import React from 'react';

import TextField, { TextFieldProps } from 'src/components/TextField';

import { Form } from '../types';

import { Collapse } from '@material-ui/core';

type NickFieldProps = TextFieldProps & {
  form: Form;
};

const NickField: React.FC<NickFieldProps> = ({ form, ...props }) => {
  return (
    <Collapse in={form === 'signup'}>
      <TextField
        required={form === 'signup'}
        label="Pseudo"
        {...props}
      />
    </Collapse>
  );
};

export default NickField;
