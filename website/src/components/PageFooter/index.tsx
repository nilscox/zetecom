import React from 'react';

import Link from 'src/components/Link';
import { useEnvironment, withEnv } from 'src/utils/env';

import logoFacebook from './facebook-logo.png';
import logoTwitter from './twitter-logo.png';

import RouterLink from 'src/components/Link/RouterLink';

import './PageFooter.scss';

const PageFooter: React.FC = withEnv(({ FACEBOOK_PAGE, TWITTER_ACCOUNT }) => (
  <div className="page-footer">

    <div className="footer-item social">

      Retrouvez-nous sur les réseaux !

      {TWITTER_ACCOUNT && (
        <Link className="social-item" href={`https://twitter.com/${TWITTER_ACCOUNT}`}>
          <img src={logoTwitter} />
          @{TWITTER_ACCOUNT}
        </Link>
      )}

      {FACEBOOK_PAGE && (
        <Link className="social-item" href={`https://facebook.com/${FACEBOOK_PAGE}`}>
          <img src={logoFacebook} />
          {FACEBOOK_PAGE}
        </Link>
      )}

    </div>

    <div className="footer-item tech">
      <div>
        Powered by <Link openInNewTab href="https://reactjs.org/">React</Link> and <Link openInNewTab href="https://nestjs.com/">Nest</Link> 😍
      </div>
      <div>
        An <Link openInNewTab href={useEnvironment('REPOSITORY_URL')}>open source</Link> project.
      </div>
    </div>

    <div className="footer-item join-us">
      Vous souhaitez participer à la conception de <em>Zétécom</em> ?
      Nous sommes <RouterLink to="/faq.html#contact">à l'écoute de vos remarques</RouterLink> !
      N'hésitez pas à partager vos idées sur <Link openInNewTab href="https://zetecom.featureupvote.com/">featureupvote.com</Link>, ou à rejoindre la <RouterLink to="/beta.html">bêta</RouterLink> :)
    </div>

  </div>
));

export default PageFooter;
