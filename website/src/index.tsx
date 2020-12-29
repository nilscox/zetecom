import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import App from './App';
import pages, { Page } from './pages';

if (typeof document !== 'undefined') {
  const mount = process.env.NODE_ENV === 'production' ? ReactDOM.hydrate : ReactDOM.render;

  mount(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app'),
  );
}

type DocumentProps = {
  page: Page;
};

const Document: React.FC<DocumentProps> = (props) => (
  <html lang="fr">
    <head>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="L'information sur internet, avec esprit critique" />

      <link type="text/css" rel="stylesheet" href="/main.css" />

      <title>Zétécom</title>

    </head>
    <body>

      <div id="app">
        <App {...props} />
      </div>

      <script src="/main.js" />

    </body>
  </html>
);

const ssr = () => {
  const makeHistory = (path: string) => createMemoryHistory({
    initialEntries: [path],
  });

  const doctype = '<!DOCTYPE html>';
  const site: Record<string, string> = {};

  for (const page of pages) {
    site[page.path] = doctype + ReactDOMServer.renderToString(
      <Router history={makeHistory(page.path)}>
        <Document page={page} />
      </Router>
    );
  }

  return site;
};

export default ssr;
