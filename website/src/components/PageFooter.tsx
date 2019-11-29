import React from 'react';

import Link from 'src/components/Link';

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
        An <Link href="https://github.com/nilscox/reagir-information">open source</Link> project.
      </div>
    </div>

    <div className="footer-item join-us">
      Vous voulez participer à la conception de <em>Réagir à l'information</em> ? Que ce soit pour proposer des
      fonctionnalités, étoffer la charte, améliorer les designs, ou même simplement réfléchir à ce que l'on
      peut construire ensemble, n'hésitez pas à <Link href="/faq.html#contact">nous contacter</Link> :)
    </div>

  </div>
);

export default PageFooter;
