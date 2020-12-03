import React from 'react';

import Link from 'src/components/Link';
import { useEnvironment, withEnv } from 'src/utils/env';

import logoFacebook from './facebook-logo.png';
import logoTwitter from './twitter-logo.png';

import { trackOpenFeatureUpvoteLink, trackOpenRepositoryLink } from '../../utils/track';
import './PageFooter.scss';

const PageFooter: React.FC = withEnv(({ FACEBOOK_PAGE, TWITTER_ACCOUNT }) => (
  <div className="page-footer">

    <div className="footer-item social">

      Retrouvez-nous sur les réseaux !

      {TWITTER_ACCOUNT && (
        <Link openInNewTab className="social-item" href={`https://twitter.com/${TWITTER_ACCOUNT}`}>
          <img src={logoTwitter} />
          @{TWITTER_ACCOUNT}
        </Link>
      )}

      {FACEBOOK_PAGE && (
        <Link openInNewTab className="social-item" href={`https://facebook.com/${FACEBOOK_PAGE}`}>
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
        An <Link openInNewTab href={useEnvironment('REPOSITORY_URL')} onClick={() => trackOpenRepositoryLink('footer')}>open source</Link> project.
      </div>
    </div>

    <div className="footer-item join-us">
      Vous souhaitez participer à la conception de <em>Zétécom</em> ?
      Nous sommes <Link href="/faq.html#contact">à l'écoute de vos remarques</Link> !
      N'hésitez pas à partager vos idées sur <Link openInNewTab href="https://zetecom.featureupvote.com/" onClick={trackOpenFeatureUpvoteLink}>featureupvote.com</Link>, où à rejoindre la <Link href="/beta.html">bêta</Link> :)
    </div>

  </div>
));

export default PageFooter;
