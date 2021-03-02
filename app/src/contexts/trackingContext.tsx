import React, { createContext, useCallback, useContext, useEffect } from 'react';

import { createInstance, MatomoProvider, useMatomo } from '@datapunt/matomo-tracker-react';
import { TrackEventParams, TrackPageViewParams } from '@datapunt/matomo-tracker-react/lib/types';
import { Location } from 'history';
import { useLocation } from 'react-router-dom';

import env from 'src/utils/env';

const { ANALYTICS_PROVIDER, ANALYTICS_URL, ANALYTICS_SITE_ID } = env;

interface TrackingProvider {
  trackPageView: (params: TrackPageViewParams) => void;
  trackEvent: (params: TrackEventParams) => void;
}

const matomoInstance =
  ANALYTICS_PROVIDER === 'matomo' &&
  createInstance({
    urlBase: ANALYTICS_URL,
    siteId: ~~ANALYTICS_SITE_ID,
    configurations: {
      setRequestMethod: 'POST',
    },
  });

const CustomTrackingContext = createContext<TrackingProvider | null>(null);

const createTrackingProvider = (type: 'mock' | 'log' | undefined, creator: () => TrackingProvider) => {
  if (ANALYTICS_PROVIDER === type) {
    return creator();
  }
};

const mockTrackingProvider = createTrackingProvider('mock', () => {
  window.zetecom.tracking = {
    pageViews: [],
    events: [],
  };

  const { pageViews, events } = window.zetecom.tracking;

  return {
    trackPageView: params => pageViews.push(params),
    trackEvent: params => events.push(params),
  };
});

/* eslint-disable no-console */
const logTrackingProvider = createTrackingProvider('log', () => ({
  trackPageView: params => console.log(`trackPageView ${params.href as string}`),
  trackEvent: params =>
  console.log(`trackEvent ${params.category} / ${params.action}${params.name ? `: ${params.name}` : ''}`),
}));
/* eslint-enable no-console */

const noopTrackingProvider: TrackingProvider = {
  trackPageView: () => {},
  trackEvent: () => {},
};

const TrackingProvider: React.FC = ({ children }) => {
  if (matomoInstance) {
    return <MatomoProvider value={matomoInstance}>{children}</MatomoProvider>;
  }

  const Provider = CustomTrackingContext.Provider;

  if (mockTrackingProvider) {
    return <Provider value={mockTrackingProvider}>{children}</Provider>;
  }

  if (logTrackingProvider) {
    return <Provider value={logTrackingProvider}>{children}</Provider>;
  }

  return <Provider value={noopTrackingProvider}>{children}</Provider>;
};

export default TrackingProvider;

export const useTracker = () => {
  const custom = useContext(CustomTrackingContext);
  const matomo = useMatomo();

  if (custom) {
    return custom;
  }

  return matomo;
};

type TrackPageViewProps = {
  shouldTrack?: (location: Location) => boolean;
};

export const TrackPageView: React.FC<TrackPageViewProps> = ({ shouldTrack }) => {
  const location = useLocation();
  const { trackPageView } = useTracker();

  useEffect(() => {
    if (shouldTrack?.(location) === false) {
      return;
    }

    // avoid tracking redirects
    const timeout = setTimeout(() => {
      trackPageView({ href: location.pathname });
    }, 0);

    return () => clearTimeout(timeout);
  }, [shouldTrack, trackPageView, location]);

  return null;
};

export const useTrackEvent = () => {
  const { trackEvent } = useTracker();

  return useCallback((event?: TrackEventParams) => event && trackEvent(event), [trackEvent]);
};
