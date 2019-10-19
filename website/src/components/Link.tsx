import React from 'react';

const Link: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({ style, ...props }) => {
  return (
    <a
      style={{
        color: '#333333',
        ...style,
      }}
      {...props}
    />
  );
};

export default Link;
