import React from 'react';

import styled from '@emotion/styled';

import Link from 'src/components/elements/Link/Link';
import { color, font, fontWeight, spacing } from 'src/theme';

import logo from './logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  a:active {
    text-decoration: none;
  }
`;

const Logo = styled.img`
  width: 56px;
`;

const MainTitle = styled.div`
  margin-left: ${spacing(4)};
  font-family: ${font('headerTitle')};
  font-size: 2rem;
  line-height: 1;
  font-weight: ${fontWeight('bold')};
  letter-spacing: 3px;
  color: ${color('secondary')};
`;

const SubTitle = styled.div`
  margin-left: ${spacing(4)};
  font-size: 1.2rem;
  line-height: 1;
  text-align: right;
  letter-spacing: 1px;
  color: ${color('secondary')};
`;

const Left = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  text-decoration: none;
`;

const Right = styled.div`
  margin-left: auto;
`;

type HeaderLogoProps = {
  right?: React.ReactNode;
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({ right }) => (
  <Container>
    <Left to="/">
      <Logo src={logo} />
      <MainTitle>Zétécom</MainTitle>
      <SubTitle>
        <div>L'information</div>
        <div>avec esprit critique</div>
      </SubTitle>
    </Left>
    {right && <Right>{right}</Right>}
  </Container>
);

export default HeaderLogo;
