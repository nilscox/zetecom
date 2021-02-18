import React, { forwardRef } from 'react';

import styled from '@emotion/styled';
import { Link as ReactRouterLink, LinkProps } from 'react-router-dom';

import useForwardRef from 'src/hooks/useForwardRef';

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, forwardedRef) => {
  const ref = useForwardRef(forwardedRef);

  return <ReactRouterLink ref={ref} onMouseUp={() => ref.current?.blur()} {...props} />;
});

Link.displayName = 'Link';

export default Link;

export const ExternalLink = styled.a();
