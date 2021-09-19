import React from 'react';

import styled from '@emotion/styled';

import { ExternalLink, WebsiteLink } from '~/components/elements/Link/Link';
import { color, fontSize, spacing } from '~/theme';

import discordLogo from './social/discord-logo.png';
import facebookLogo from './social/facebook-logo.png';
import twitterLogo from './social/twitter-logo.png';

const Container = styled.footer`
  margin: ${spacing(5, 0)};
  border-top: 1px solid ${color('border')};
  padding-top: ${spacing(3)};
  font-size: ${fontSize(1)};
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  margin: ${spacing(0, 2)};
  flex: 1;
`;

const FooterItem = styled.div`
  margin: ${spacing(3, 0)};
  display: block;
`;

const SocialImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: ${spacing(2)};
  vertical-align: middle;
`;

export const Footer: React.FC = () => (
  <Container>
    <Column>
      <FooterItem>
        <WebsiteLink href={'/charte.html'}>La charte de zétécom</WebsiteLink>
      </FooterItem>
      <FooterItem>
        <WebsiteLink href={'/utilisation.html'}>Utilisation</WebsiteLink>
      </FooterItem>
      <FooterItem>
        <WebsiteLink href={'/faq.html'}>FAQ</WebsiteLink>
      </FooterItem>
      <FooterItem>
        <WebsiteLink href={'/faq.html#contact'}>Contact</WebsiteLink>
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
        <ExternalLink href={'https://zetecom.featureupvote.com'}>Proposer une idée</ExternalLink>
      </FooterItem>
      <FooterItem>
        <WebsiteLink href={'/beta.html'}>Rejoindre la bêta</WebsiteLink>
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
      <FooterItem>
        <ExternalLink href="https://discord.gg/huwfqra">
          <SocialImage src={discordLogo} />
          discord
        </ExternalLink>
      </FooterItem>
    </Column>
  </Container>
);
