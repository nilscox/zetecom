import React from 'react';

import Link from 'src/components/Link';
import { useEnvironment } from 'src/index';

import logoFacebook from 'src/images/facebook-logo.png';
import logoTwitter from 'src/images/twitter-logo.png';

import './PageFooter.scss';

const PageFooter: React.FC = () => (
  <div className="page-footer">

    <div className="footer-item social">
      Retrouvez-nous sur les réseaux !
      <Link openInNewTab className="social-item" href="https://facebook.com/zetecom3">
        <img src={logoFacebook} />
        zetecom3
      </Link>
      <Link openInNewTab className="social-item" href="https://twitter.com/zetecom1">
        <img src={logoTwitter} />
        @zetecom1
      </Link>
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
