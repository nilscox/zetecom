import React from 'react';

type OutlineProps = {
  children: React.ReactNode;
};

const Outline: React.FC<OutlineProps> = ({ children }) => (
  <div
    style={{
      fontSize: 20,
      margin: '25px 10%',
      lineHeight: 1.5,
    }}
  >
    { children }
  </div>
);

export default Outline;
