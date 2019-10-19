import React from 'react';

import NewNameBanner from './components/NewNameBanner';
import PageHeader from './components/PageHeader';
import Navigation from './components/Navigation';
import { Page as PageType } from './pages';

import './style.scss';

const PageLayout: React.FC<PageType> = ({ id, Component }) => (
  <div className="page" id={`page-${id}`}>

    <NewNameBanner />
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
      <script src="http://localhost:8000/webpack-dev-server.js" />

    </body>
  </html>
);

export default Page;
