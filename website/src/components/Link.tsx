import React from 'react';

type LinkProps = React.HTMLProps<HTMLAnchorElement> & {
  openInNewTab?: boolean;
};

const Link: React.FC<LinkProps> = ({ openInNewTab = false, ...props }) => {
  if (openInNewTab) {
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  }

  return <a {...props} />;
};

export default Link;
