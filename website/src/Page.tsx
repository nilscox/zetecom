import React from 'react';

import { useEnvironment } from 'src/index';
import NewNameBanner from 'src/components/NewNameBanner';
import EmailValidatedAlert from 'src/components/EmailValidatedAlert';
import PageHeader from 'src/components/PageHeader';
import Navigation from 'src/components/Navigation';
import { Page as PageType } from 'src/pages';

import './style.scss';

const PageLayout: React.FC<PageType> = ({ id, Component }) => (
  <div className="page" id={`page-${id}`}>

    <NewNameBanner />
    <EmailValidatedAlert />
    <PageHeader />

    <div className="page-content">

      <Navigation />

      <main>
        <Component />
      </main>

    </div>

  </div>
);

const Page: React.FC<PageType> = (props) => (
  <html lang="fr">
    <head>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Réagir à l'information sur internet" />

      <title>Réagir à l'information</title>

      <link type="text/css" rel="stylesheet" href="/assets/css/reset.css" />
      <link type="text/css" rel="stylesheet" href="/assets/css/reset.css" />
      <link type="text/css" rel="stylesheet" href="/assets/css/styles.css" />

    </head>
    <body>

      <PageLayout {...props} />

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: 'window.env = ' + JSON.stringify({
            BASE_URL: useEnvironment('BASE_URL'),
            NODE_ENV: useEnvironment('NODE_ENV'),
          }),
        }}
      />

      <script type="text/javascript" src="/assets/js/client.js" />
      { useEnvironment('NODE_ENV') === 'development' && (
        <script src={useEnvironment('BASE_URL') + '/webpack-dev-server.js'} />
      ) }

    </body>
  </html>
);

export default Page;
