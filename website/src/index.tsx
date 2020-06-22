/// <reference path="index.d.ts" />

import React, { createContext, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactGA from 'react-ga';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router, useLocation } from 'react-router-dom';

import App from './App';
import Document from './Document';
import pages from './pages';

import './style.scss';

const EnvironmentVariables = {
  NODE_ENV: process.env.NODE_ENV,
  CHROME_EXTENSION_URL: process.env.CHROME_EXTENSION_URL,
  FIREFOX_ADDON_URL: process.env.FIREFOX_ADDON_URL,
  CHROME_EXTENSION_STAGING_URL: process.env.CHROME_EXTENSION_STAGING_URL,
  FIREFOX_ADDON_STAGING_URL: process.env.FIREFOX_ADDON_STAGING_URL,
  REPOSITORY_URL: process.env.REPOSITORY_URL,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  FACEBOOK_PAGE: process.env.FACEBOOK_PAGE,
  TWITTER_ACCOUNT: process.env.TWITTER_ACCOUNT,
};

const EnvironmentContext = createContext(EnvironmentVariables);
export const useEnvironment = (env: keyof typeof EnvironmentVariables) => useContext(EnvironmentContext)[env];

const TrackPageView: React.FC = () => {
  const location = useLocation();
  const page = [location.pathname, location.search, location.hash].join('');

  useEffect(() => {
    if (EnvironmentVariables.GOOGLE_ANALYTICS_ID)
      ReactGA.pageview(page);
  }, [page]);

  return null;
};

if (typeof document !== 'undefined') {
  if (EnvironmentVariables.GOOGLE_ANALYTICS_ID)
    ReactGA.initialize(EnvironmentVariables.GOOGLE_ANALYTICS_ID);

  ReactDOM.hydrate(
    <BrowserRouter>
      <TrackPageView />
      <App />
    </BrowserRouter>,
    document.getElementById('app'),
  );
}

export default function render() {
  const doctype = '<!DOCTYPE html>';
  const makeHistory = (path: string) => createMemoryHistory({
    initialEntries: [path]
  });

  return pages.reduce((obj, page) => ({
    ...obj,
    [page.path]: doctype + ReactDOMServer.renderToString(
      <Router history={makeHistory(page.path)}>
        <Document page={page} />
      </Router>
    ),
  }), {});
};
