import React from 'react';

import Text, { TextProps } from 'src/components/common/Text';

type ButtonProps = TextProps & {
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ disabled, onClick, ...props }) => {
  if (disabled)
    return <Text variant="button" style={{ cursor: 'initial' }} {...props} color="disabled" />;

  return (
    <Text variant="button" onClick={onClick} {...props} />
  );
};

export default Button;
