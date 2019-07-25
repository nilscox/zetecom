import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import Text, { TextProps } from './Text';

type TextLinkProps = TextProps & {
  link: LinkProps;
};

const TextLink: React.FC<TextLinkProps> = ({ link, ...props }) => (
  <Link {...link}>
    <Text {...props} />
  </Link>
);

export default TextLink;
