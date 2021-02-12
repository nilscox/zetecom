import React, { forwardRef } from 'react';

import styled from '@emotion/styled';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

import useForwardRef from 'src/hooks/useForwardRef';
import { textColor } from 'src/theme';

const StyledLink = styled(ReactRouterLink)`
  color: ${textColor('link')};
  outline: none;

  &:focus {
    color: ${textColor('linkFocused')};
  }
`;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, forwardedRef) => {
  const ref = useForwardRef(forwardedRef);

  return <StyledLink ref={ref} onMouseUp={() => ref.current?.blur()} {...props} />;
});

Link.displayName = 'Link';

export default Link;
