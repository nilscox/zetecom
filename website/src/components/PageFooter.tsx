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
      <div className="social-item">
        <img src={logoFacebook} />
        Bientôt...
      </div>
      <div className="social-item">
        <img src={logoTwitter} />
        @NilsCox
      </div>
    </div>

    <div className="footer-item tech">
      <div>
        Powered by <Link href="https://reactjs.org/">React</Link> and <Link href="https://nestjs.com/">Nest</Link> 😍
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
