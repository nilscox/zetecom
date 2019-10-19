import React from 'react';

import './style.scss';
import PageHeader from './components/PageHeader';
import Navigation from './components/Navigation';

type PageProps = {
  id: string;
  path: string;
  label: string;
  Component: React.ComponentType,
};

const PageLayout: React.FC<PageProps> = ({ id, path, label, Component }) => (
  <div className="page" id={`page-${id}`}>

    <PageHeader />

    <div className="page-content">

      <Navigation />

      <main>
        <Component />
      </main>

    </div>

  </div>
);

const Page: React.FC<PageProps> = (props) => (
  <html lang="fr">
    <head>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Réagir à l'information sur internet" />

      <title>Réagir à l'information</title>

      <link type="text/css" rel="stylesheet" href="/assets/css/reset.css" />
      <link type="text/css" rel="stylesheet" href="/assets/css/reset.css" />
      <link type="text/css" rel="stylesheet" href="/assets/css/fonts.css" />
      <link type="text/css" rel="stylesheet" href="/styles.css" />

    </head>
    <body>
      <PageLayout {...props} />
      <script src="http://localhost:8000/webpack-dev-server.js" />
      <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
        const navigation = document.querySelector('.navigation');
        const burger = navigation.querySelector('.navigation-burger');

        let navigationOpen = false;

        burger.addEventListener('click', () => {
          navigationOpen = !navigationOpen;

          if (navigationOpen)
            navigation.classList.add('open');
          else
            navigation.classList.remove('open');
        });
      ` }} />

    </body>
  </html>
);

export default Page;
