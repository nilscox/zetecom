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

const Logo = styled.img<{ small?: boolean }>`
  width: ${({ small }) => (small ? 42 : 56)}px;
`;

const MainTitle = styled.div<{ small?: boolean }>`
  margin-left: ${({ small, theme }) => theme.spacings[small ? 2 : 4]};
  font-family: ${font('headerTitle')};
  font-size: ${({ small }) => (small ? 1.7 : 2)}rem;
  line-height: 1;
  font-weight: ${fontWeight('bold')};
  letter-spacing: 3px;
  color: ${color('secondary')};
`;

const SubTitle = styled.div<{ small?: boolean }>`
  margin-left: ${({ small, theme }) => theme.spacings[small ? 2 : 4]};
  font-size: ${({ small }) => (small ? 1 : 1.2)}rem;
  line-height: 1;
  text-align: right;
  letter-spacing: 1px;
  color: ${color('secondary')};
`;

const Left = styled.div<{ to?: string | false }>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  text-decoration: none;
`;

const Right = styled.div`
  margin-left: auto;
`;

type HeaderLogoProps = {
  small?: boolean;
  link?: string | false;
  right?: React.ReactNode;
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({ small, link = '/', right }) => (
  <Container>
    <Left as={link !== false ? Link : undefined} to={link || undefined}>
      <Logo small={small} src={logo} />
      <MainTitle small={small}>Zétécom</MainTitle>
      <SubTitle small={small}>
        <div>L'information</div>
        <div>avec esprit critique</div>
      </SubTitle>
    </Left>
    {right && <Right>{right}</Right>}
  </Container>
);

export default HeaderLogo;
