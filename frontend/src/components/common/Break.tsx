import React from 'react';

import { Theme, useTheme } from 'src/utils/Theme';

type BreakProps = {
  size: number | keyof Theme['sizes'];
};

const Break: React.FC<BreakProps> = ({ size }) => {
  const { sizes } = useTheme();

  return (
    <div
      style={{
        height: typeof size === 'string' ? sizes[size] : size,
      }}
    />
  );
};

export default Break;
