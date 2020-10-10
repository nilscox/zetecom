import ReactGA from 'react-ga';

import env from './env';

const noop = () => {};

export type GAEvent = { category: string; action: string; label?: string };

const noopGa = () => ({
  initialize: noop,
  event: noop,
  pageview: noop,
});

/* eslint-disable no-console */

const logGa = () => ({
  initialize() {
    console.log('ReactGA initialized');
  },
  event(event: GAEvent) {
    console.log('ReactGA event', event);
  },
  pageview(page: string) {
    console.log('ReactGA pageview', page);
  },
});

/* eslint-enable no-console */

const mockGa = () => {
  return {
    initialize() {
      window.zetecom.mockGa = {
        initialized: true,
        events: [] as GAEvent[],
        pageviews: [] as string[],
      };
    },
    event(event: GAEvent) {
      window.zetecom.mockGa?.events.push(event);
    },
    pageview(page: string) {
      window.zetecom.mockGa?.pageviews.push(page);
    },
  };
};

const ga = () => {
  if (!env.GOOGLE_ANALYTICS_ID) {
    return noopGa();
  }

  if (env.GOOGLE_ANALYTICS_ID === 'dev') {
    return logGa();
  }

  if (env.GOOGLE_ANALYTICS_ID === 'mock') {
    return mockGa();
  }

  return ReactGA;
};

export default ga();
