import React from 'react';

import styled from '@emotion/styled';

import { fontWeight, size, spacing, textColor } from 'src/theme';

import AvatarImage from '../../elements/AvatarImage/AvatarImage';
import Link from '../../elements/Link/Link';

const Container = styled(Link)`
  width: ${size('small')};
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${fontWeight('bold')};
  color: ${textColor('default')};
  text-decoration: none;

  img {
    margin-bottom: ${spacing(0.5)};
  }
`;

const UnauthenticatedUserMenu: React.FC = () => (
  <Container to="/connexion">
    <AvatarImage />
    Connexion
  </Container>
);

export default UnauthenticatedUserMenu;
