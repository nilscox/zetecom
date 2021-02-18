import React from 'react';

import Collapse from 'src/components/layout/Collapse/Collapse';

import AuthenticationFormInput from '../AuthenticationFormInput/AuthenticationFormInput';

type NickFieldProps = {
  display: boolean;
  placeholder: string;
  value: string;
  error?: React.ReactNode;
  onChange: (event: React.ChangeEvent) => void;
};

const NickField: React.FC<NickFieldProps> = ({ display, ...props }) => (
  <Collapse in={display}>
    <AuthenticationFormInput outlined type="text" tabIndex={display ? undefined : -1} required={display} {...props} />
  </Collapse>
);

export default NickField;
