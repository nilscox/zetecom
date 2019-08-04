import React from 'react';

type BreakProps = {
  size: number;
};

const Break: React.FC<BreakProps> = ({ size }) => (
  <div style={{ height: size }} />
);

export default Break;
