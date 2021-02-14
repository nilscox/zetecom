import React, { useState } from 'react';

import Input, { InputProps } from '../Input/Input';

import useDateInput from './useDateInput';

type DateInputProps = InputProps & {
  // use a string to avoid timezone issues
  onDateChange?: (value: string) => void;
};

const DateInput: React.FC<DateInputProps> = ({ placeholder, value: valueProp, onDateChange, ...props }) => {
  const handleDateChange = (date: string) => {
    if (date !== valueProp) {
      onDateChange(date);
    }
  };

  const [value, handleKeyDown] = useDateInput(valueProp as string, handleDateChange);
  const [focused, setFocused] = useState(false);

  return (
    <Input
      {...props}
      onChange={() => {}}
      value={value}
      placeholder={focused ? 'jj / mm / aaaa' : placeholder}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
};

export default DateInput;
