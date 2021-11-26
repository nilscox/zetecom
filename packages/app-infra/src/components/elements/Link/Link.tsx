import React from 'react';

import styled from '@emotion/styled';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useEnvironment } from '~/hooks/useEnvironment';
import { color } from '~/theme';

export const Link = styled(ReactRouterLink)`
  color: ${color('link')};
  text-decoration-color: ${color('linkUnderline')};

  &:focus-visible {
    outline: none;
    background-color: ${color('muted')};
  }
`;

export const ExternalLink = styled.a`
  color: ${color('link')};
  text-decoration-color: ${color('linkUnderline')};

  &:focus-visible {
    outline: none;
    background-color: ${color('muted')};
  }
`;

type WebsiteLinkProps = React.ComponentProps<typeof ExternalLink>;

export const WebsiteLink: React.FC<WebsiteLinkProps> = ({ href, ...props }) => (
  <ExternalLink href={useEnvironment('WEBSITE_URL') + (href ?? '')} {...props} />
);
