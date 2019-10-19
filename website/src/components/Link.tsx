import React from 'react';

const Link: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({ style, ...props }) => {
  return (
    <a {...props} />
  );
};

export default Link;
