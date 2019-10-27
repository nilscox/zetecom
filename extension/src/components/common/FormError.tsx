import React from 'react';

import Text from './Text';

type FormErrorProps = {
  children: React.ReactNode;
};

const FormError: React.FC<FormErrorProps> = ({ children }) => (
  <Text bold uppercase color="textWarning" size="note">{ children }</Text>
);

export default FormError;
