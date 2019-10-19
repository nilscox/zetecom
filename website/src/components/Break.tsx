import React from 'react';

const sizes = {
  small: 8,
  medium: 16,
  big: 24,
}

type BreakProps = {
  size: keyof typeof sizes;
  factor?: number;
};

const Break: React.FC<BreakProps> = ({ size }) => (
  <div
    style={{
      height: typeof size === 'string' ? sizes[size] : size,
    }}
  />
);

export default Break;
