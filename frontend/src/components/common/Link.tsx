import React from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import { useTheme } from 'src/utils/Theme';

type LinkProps = ReactRouterLinkProps;

const Link: React.FC<LinkProps> = ({ style, ...props }) => {
  const { colors: { text } } = useTheme();
  return (
    <ReactRouterLink
      style={{
        color: text,
        ...style,
      }}
      {...props}
    />
  );
};

export default Link;
