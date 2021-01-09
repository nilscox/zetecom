import React, { createContext, useContext, useEffect, useMemo } from 'react';

import { createInstance, MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { TrackEventParams, TrackPageViewParams } from '@datapunt/matomo-tracker-react/lib/types';
import { useLocation } from 'react-router-dom';

import env from 'src/utils/env';

const { ANALYTICS_URL, ANALYTICS_SITE_ID } = env;

interface TrackingProvider {
  trackPageView: (params: TrackPageViewParams) => void;
  trackEvent: (params: TrackEventParams) => void;
}

const CustomTrackingContext = createContext<TrackingProvider | null>(null);

const useTrackingProvider = (): { Provider: React.FC<{ value: TrackingProvider }>; value: TrackingProvider } => {
  const matomoInstance = useMemo(() => {
    if (!ANALYTICS_SITE_ID || ['log', 'mock'].includes(ANALYTICS_SITE_ID)) {
      return null;
    }

    return createInstance({
      urlBase: ANALYTICS_URL,
      siteId: ~~ANALYTICS_SITE_ID,
      configurations: {
        setRequestMethod: 'POST',
      },
    });
  }, []);

  if (!ANALYTICS_SITE_ID) {
    return {
      Provider: CustomTrackingContext.Provider,
      value: {
        trackPageView: () => {},
        trackEvent: () => {},
      },
    };
  }

  if (ANALYTICS_SITE_ID === 'log') {
    /* eslint-disable no-console */
    return {
      Provider: CustomTrackingContext.Provider,
      value: {
        trackPageView: params => console.log(`trackPageView ${params.href as string}`),
        trackEvent: params =>
          console.log(`trackEvent ${params.category} / ${params.action}${params.name ? `: ${params.name}` : ''}`),
      },
    };
    /* eslint-enable no-console */
  }

  if (ANALYTICS_SITE_ID === 'mock') {
    window.zetecom.tracking = {
      pageViews: [],
      events: [],
    };

    const { pageViews, events } = window.zetecom.tracking;

    return {
      Provider: CustomTrackingContext.Provider,
      value: {
        trackPageView: params => pageViews.push(params),
        trackEvent: params => events.push(params),
      },
    };
  }

  return {
    Provider: MatomoProvider,
    value: matomoInstance,
  };
};

const TrackingProvider: React.FC = ({ children }) => {
  const { Provider, value } = useTrackingProvider();

  return <Provider value={value}>{children}</Provider>;
};

export default TrackingProvider;

const useTracker = () => {
  const custom = useContext(CustomTrackingContext);
  const matomo = useMatomo();

  return custom || matomo;
};

export const TrackPageView: React.FC = () => {
  const location = useLocation();
  const { trackPageView } = useTracker();

  useEffect(() => {
    // do not track redirects
    const timeout = setTimeout(() => {
      trackPageView({ href: location.pathname });
    }, 0);

    return () => clearTimeout(timeout);
  }, [trackPageView, location.pathname]);

  return null;
};

export const useTrackEvent = () => {
  const { trackEvent } = useTracker();

  return (event?: TrackEventParams) => event && trackEvent(event);
};
