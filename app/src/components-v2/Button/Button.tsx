import React, { HTMLAttributes } from 'react';

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ disabled, loading, ...props }) => {
  return <button {...props} />;
};

export default Button;
