import React from 'react';

import { Page } from './pages';
import App from './App';
import { useEnvironment } from './index';

type DocumentProps = {
  page: Page;
};

const Document: React.FC<DocumentProps> = (props) => (
  <html lang="fr">
    <head>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="L'information sur internet, avec esprit critique" />

      <title>Zétécom</title>

      <link type="text/css" rel="stylesheet" href="/assets/css/reset.css" />
      <link type="text/css" rel="stylesheet" href="/assets/css/styles.css" />

    </head>
    <body>

      <div id="app">
        <App {...props} />
      </div>

      <script type="text/javascript" src="/index.js" />

      { useEnvironment('NODE_ENV') === 'development' && (
        <script src={useEnvironment('WEBSITE_URL') + '/webpack-dev-server.js'} />
      ) }

      { useEnvironment('NODE_ENV') === 'production' && (
        <>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-143537578-1" />
          <script type="text/javascript" src="/assets/js/gtag.js" />
        </>
      ) }

    </body>
  </html>
);

export default Document;
