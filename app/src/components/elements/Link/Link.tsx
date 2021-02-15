import React, { forwardRef } from 'react';

import styled from '@emotion/styled';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

import useForwardRef from 'src/hooks/useForwardRef';
import { textColor, transition } from 'src/theme';

const StyledLink = styled.a`
  outline: none;
  color: ${textColor('link')};
  transition: ${transition('fast', 'color')};

  &:focus {
    color: ${textColor('linkFocused')};
    transition: none;
  }
`;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, forwardedRef) => {
  const ref = useForwardRef(forwardedRef);

  return <StyledLink ref={ref} as={ReactRouterLink} onMouseUp={() => ref.current?.blur()} {...props} />;
});

Link.displayName = 'Link';

export default Link;

export const ExternalLink = StyledLink;
