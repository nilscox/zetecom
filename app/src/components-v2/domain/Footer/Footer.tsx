import React from 'react';

import styled from '@emotion/styled';

import { ExternalLink } from 'src/components-v2/elements/Link/Link';
import { color, spacing } from 'src/theme';
import env from 'src/utils/env';

import facebookLogo from './facebook-logo.png';
import twitterLogo from './twitter-logo.png';

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  margin-top: ${spacing(2)};
  border-top: 1px solid ${color('border')};
  padding-top: ${spacing(2)};
`;

const Column = styled.div`
  flex: 1;
`;

const FooterItem = styled.div`
  margin: ${spacing(2, 0)};
  display: block;
`;

const SocialImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: ${spacing(2)};
  vertical-align: bottom;
`;

const Footer: React.FC = () => (
  <Container>
    <Column>
      <FooterItem>
        <ExternalLink href={`${env.WEBSITE_URL}/charte.html`}>La charte de zétécom</ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href={`${env.WEBSITE_URL}/utilisation.html`}>Utilisation</ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href={`${env.WEBSITE_URL}/faq.html`}>FAQ</ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href={`${env.WEBSITE_URL}/faq.html#contact`}>Contactez-nous</ExternalLink>
      </FooterItem>
    </Column>

    <Column>
      <FooterItem>
        {/* eslint-disable-next-line max-len */}
        <ExternalLink href="https://chrome.google.com/webstore/detail/z%C3%A9t%C3%A9com/pnppgdnmhjaoafcadennndpcdoglilcn">
          Installer l'extension Chrome
        </ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href="https://addons.mozilla.org/fr/firefox/addon/z%C3%A9t%C3%A9com/">
          Installer l'addon Firefox
        </ExternalLink>
      </FooterItem>
      <FooterItem>
        Un projet <ExternalLink href={'https://github.com/nilscox/zetecom'}>open source</ExternalLink>
      </FooterItem>
    </Column>

    <Column>
      <FooterItem>
        <ExternalLink href={`${env.WEBSITE_URL}/beta.html`}>Rejoindre la bêta</ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href={'https://zetecom.featureupvote.com'}>Proposer une idée</ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href={'https://trello.com/b/CfC8aQ80/tasks'}>Roadmap</ExternalLink>
      </FooterItem>
    </Column>

    <Column>
      <FooterItem>
        <ExternalLink href="https://facebook.com/zetecom42">
          <SocialImage src={facebookLogo} />
          zetecom42
        </ExternalLink>
      </FooterItem>
      <FooterItem>
        <ExternalLink href="https://twitter.com/zetecom1">
          <SocialImage src={twitterLogo} />
          @zetecom1
        </ExternalLink>
      </FooterItem>
    </Column>
  </Container>
);

export default Footer;
