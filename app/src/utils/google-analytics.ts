import ReactGA from 'react-ga';

import env from './env';

export type GAEvent = { category: string; action: string; label?: string };

const noop = () => {};

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
  window.zetecom.mockGa = {
    initialized: false,
    events: [] as GAEvent[],
    pageviews: [] as string[],
  };

  return {
    initialize() {
      window.zetecom.mockGa.initialized = true;
    },
    event(event: GAEvent) {
      window.zetecom.mockGa.events.push(event);
    },
    pageview(page: string) {
      window.zetecom.mockGa.pageviews.push(page);
    },
  };
};

const ga = () => {
  if (env.CYPRESS === 'true')
    return mockGa();

  if (!env.GOOGLE_ANALYTICS_ID)
    return { initialize: noop, event: noop, pageview: noop };

  if (env.GOOGLE_ANALYTICS_ID === 'testing')
    return logGa();

  return ReactGA;
};

export default ga();
