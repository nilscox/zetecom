import React from 'react';

import { useEnvironment, usePage } from 'src/index';
import EmailValidatedAlert from 'src/components/EmailValidatedAlert';
import PageHeader from 'src/components/PageHeader';
import Navigation from 'src/components/Navigation';
import { Page as PageType } from 'src/pages';

import './style.scss';

const PageLayout: React.FC<PageType> = ({ id, Component }) => (
  <div className="page" id={`page-${id}`}>

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

      <script type="text/javascript" src="/assets/js/client.js" />

      { useEnvironment('NODE_ENV') === 'production' && usePage().id === 'faq' && (
        <script type="text/javascript" src="https://tlk.io/embed.js" />
      ) }

      { useEnvironment('NODE_ENV') === 'development' && (
        <script src={useEnvironment('WEBSITE_URL') + '/webpack-dev-server.js'} />
      ) }

      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-143537578-1" />
      <script type="text/javascript" src="/assets/js/gtag.js" />

    </body>
  </html>
);

export default Page;
