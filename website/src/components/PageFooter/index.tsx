import React from 'react';

import Link from 'src/components/Link';
import { useEnvironment } from 'src/index';

import logoFacebook from './facebook-logo.png';
import logoTwitter from './twitter-logo.png';

import './PageFooter.scss';

const PageFooter: React.FC = () => (
  <div className="page-footer">

    <div className="footer-item social">

      Retrouvez-nous sur les réseaux !

      {useEnvironment('FACEBOOK_PAGE') && (
        <Link openInNewTab className="social-item" href={`https://facebook.com/${useEnvironment('FACEBOOK_PAGE')}`}>
          <img src={logoFacebook} />
          {useEnvironment('FACEBOOK_PAGE')}
        </Link>
      )}

      {useEnvironment('TWITTER_ACCOUNT') && (
        <Link openInNewTab className="social-item" href={`https://twitter.com/${useEnvironment('TWITTER_ACCOUNT')}`}>
          <img src={logoTwitter} />
          @{useEnvironment('TWITTER_ACCOUNT')}
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
      Vous souhaitez participer à la conception de <em>Zétécom</em> ? Nous sommes <Link href="/faq.html#contact">à l'écoute</Link> de vos retours pour améliorer l'extension, le site, ou même la charte. Tant sur les fonctionnalités que sur la forme, n'hésitez pas à nous partager vos avis et vos idées !
    </div>

  </div>
);

export default PageFooter;
