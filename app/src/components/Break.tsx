import React from 'react';

import { Theme, useTheme } from 'src/theme/Theme';

type BreakProps = {
  size: number | keyof Theme['sizes'];
  factor?: number;
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
