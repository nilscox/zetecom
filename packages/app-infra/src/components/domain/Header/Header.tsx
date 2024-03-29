import React from 'react';

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { spacing } from '~/theme';

import { Logo } from '../Logo/Logo';

type HeaderProps = {
  right?: React.ReactNode;
  link?: string;
};

export const Header: React.FC<HeaderProps> = ({ right, link = '/' }) => (
  <Container>
    <Link to={link}>
      <Logo forceShowSubtitle={!right} />
    </Link>
    {right && <Right>{right}</Right>}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${spacing(4)};

  a {
    text-decoration: none;
  }
`;

const Right = styled.div`
  margin-left: auto;
`;
