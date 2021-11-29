import React from 'react';

import styled from '@emotion/styled';

import { breakpoints, color, domain, font, fontSize, fontWeight, spacing } from '~/theme';

import logo from './logo.png';

type LogoProps = {
  forceShowSubtitle?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ forceShowSubtitle }) => (
  <Container>
    <LogoImage src={logo} />
    <MainTitle>Zétécom</MainTitle>
    <SubTitle show={forceShowSubtitle}>
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

const LogoImage = styled.img`
  width: ${domain('logo', 'width')};
`;

const MainTitle = styled.div`
  margin-left: ${spacing(4)};
  font-weight: ${fontWeight('bold')};
  font-family: ${font('logo')};
  font-size: ${domain('mainTitle', 'fontSize')};
  line-height: 1;
  letter-spacing: ${domain('mainTitle', 'letterSpacing')};
  color: ${color('secondary')};
`;

const SubTitle = styled.div<{ show?: boolean }>`
  margin-left: ${spacing(4)};
  font-size: ${fontSize(2)};
  line-height: 1;
  letter-spacing: ${domain('subTitle', 'letterSpacing')};
  color: ${color('secondary')};
  text-align: right;

  ${breakpoints.down('small')} {
    display: ${({ show }) => (show ? undefined : 'none')};
  }
`;
