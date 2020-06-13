import React from 'react';

import { Page } from './pages';
import App from './App';
import { useEnvironment } from './index';

const GTM = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KM3DQMX');`;

const Tracking: React.FC = () => (
  <>
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KM3DQMX" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
    </noscript>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169280449-1" />
    <script type="text/javascript" src="/assets/js/gtag.js" />
  </>
);

type DocumentProps = {
  page: Page;
};

const Document: React.FC<DocumentProps> = (props) => (
  <html lang="fr">
    <head>

      <script dangerouslySetInnerHTML={{ __html: GTM }} />

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="L'information sur internet, avec esprit critique" />

      <title>Zétécom</title>

      <link type="text/css" rel="stylesheet" href="/assets/css/reset.css" />
      <link type="text/css" rel="stylesheet" href="/assets/css/styles.css" />

    </head>
    <body>

      { useEnvironment('NODE_ENV') === 'production' && <Tracking /> }

      <div id="app">
        <App {...props} />
      </div>

      <script type="text/javascript" src="/index.js" />

      { useEnvironment('NODE_ENV') === 'development' && (
        <script src={useEnvironment('WEBSITE_URL') + '/webpack-dev-server.js'} />
      ) }

    </body>
  </html>
);

export default Document;
