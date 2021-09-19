import React from 'react';

import styled from '@emotion/styled';

import { color, domain, font, fontSize, fontWeight, spacing } from '~/theme';

import logo from './logo.png';

type LogoProps = {
  small?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ small }) => (
  <Container>
    <LogoImage src={logo} small={small} />
    <MainTitle small={small}>Zétécom</MainTitle>
    <SubTitle small={small}>
      <div>L'information</div>
      <div>avec esprit critique</div>
    </SubTitle>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  text-decoration: none;
`;

const LogoImage = styled.img<LogoProps>`
  width: ${({ small }) => domain('logo', small ? 'widthSmall' : 'width')};
`;

const MainTitle = styled.div<LogoProps>`
  margin-left: ${spacing(4)};
  font-weight: ${fontWeight('bold')};
  font-family: ${font('logo')};
  font-size: ${({ small }) => domain('mainTitle', small ? 'fontSizeSmall' : 'fontSize')};
  line-height: 1;
  letter-spacing: ${domain('mainTitle', 'letterSpacing')};
  color: ${color('secondary')};
`;

const SubTitle = styled.div<LogoProps>`
  margin-left: ${spacing(4)};
  font-size: ${({ small }) => fontSize(small ? 1 : 2)};
  line-height: 1;
  letter-spacing: ${domain('subTitle', 'letterSpacing')};
  color: ${color('secondary')};
  text-align: right;
`;
