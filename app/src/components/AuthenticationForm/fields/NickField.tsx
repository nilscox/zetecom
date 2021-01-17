import React from 'react';

import { Collapse } from '@material-ui/core';

import Input, { InputProps } from 'src/components/Input';

import { Form } from '../types';

type NickFieldProps = InputProps & {
  form: Form;
};

const NickField: React.FC<NickFieldProps> = ({ form, ...props }) => {
  return (
    <Collapse in={form === 'signup'}>
      <Input fullWidth required={form === 'signup'} variant="outlined" placeholder="Pseudo" {...props} />
    </Collapse>
  );
};

export default NickField;
