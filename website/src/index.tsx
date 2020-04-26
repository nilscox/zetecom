/// <reference path="index.d.ts" />

import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';

import App from './App';
import Document from './Document';
import pages from './pages';

import './style.scss';

const EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV,
  WEBSITE_URL: process.env.WEBSITE_URL,
  CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
  REPOSITORY_URL: process.env.REPOSITORY_URL,
};

const EnvironmentContext = createContext(EnvironmentVariables);
export const useEnvironment = (env: keyof typeof EnvironmentVariables) => useContext(EnvironmentContext)[env];

if (typeof document !== 'undefined') {
  ReactDOM.hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app'),
  );
}

export default function render(locals: any) {
  const doctype = '<!DOCTYPE html>';
  const makeHistory = (path: string) => createMemoryHistory({
    initialEntries: [path]
  });

  return pages.reduce((obj, page) => ({
    ...obj,
    [page.path]: doctype + ReactDOMServer.renderToString(
      <EnvironmentContext.Provider value={locals}>
        <Router history={makeHistory(page.path)}>
          <Document locals={locals} page={page} />
        </Router>
      </EnvironmentContext.Provider>
    ),
  }), {});
};
