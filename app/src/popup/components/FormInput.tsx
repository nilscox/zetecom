import React, { useState } from 'react';

import Flex from 'src/components/common/Flex';
import Input, { InputProps } from 'src/components/common/Input';
import { useTheme } from 'src/utils/Theme';

import FormError from './FormError';

export type FormInputProps = InputProps & {
  errorMessage?: string;
  onTextChange: (text: string) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  errorMessage,
  onTextChange,
  ...props
}) => {
  const { sizes: { medium } } = useTheme();
  const [value, setValue] = useState('');

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onTextChange(e.currentTarget.value);
  };

  return (
    <Flex
      flexDirection="column"
      mb={medium}
      alignItems="stretch"
    >
      { errorMessage && <FormError style={{ textAlign: 'right' }}>{errorMessage}</FormError> }
      <Input
        style={{
          margin: '5px 0',
          padding: '5px 10px',
          borderRadius: '2px',
          border: '1px solid #ccc',
        }}
        value={value}
        onChange={e => handleTextChange(e)}
        {...props}
      />
    </Flex>
  );
};

export default FormInput;
