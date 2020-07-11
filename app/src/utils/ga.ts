import ReactGA from 'react-ga';

import env from './env';

const noop = () => {};

const ga = () => {
  if (!env.GOOGLE_ANALYTICS_ID)
    return { initialize: noop, event: noop, pageview: noop };

  if (env.GOOGLE_ANALYTICS_ID === 'testing') {
    return {
      initialize() {
        console.log('Mock ReactGA initialized');
      },
      event(event: { category: string; action: string; label?: string }) {
        console.log('Mock ReactGA event', event);
      },
      pageview(page: string) {
        console.log('Mock ReactGA pageview', page);
      },
    };
  }

  return ReactGA;
};

export default ga();
