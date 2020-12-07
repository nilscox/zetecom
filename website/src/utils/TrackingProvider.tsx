import React, { useEffect, useMemo } from 'react';

import { MatomoProvider, createInstance, useMatomo } from '@datapunt/matomo-tracker-react'

import { useEnvironment } from 'src/utils/env';
import { useLocation } from 'react-router-dom';

const TrackingProvider: React.FC = ({ children }) => {
  const ANALYTICS_SITE_ID = useEnvironment('ANALYTICS_SITE_ID');
  const ANALYTICS_URL = useEnvironment('ANALYTICS_URL');

  const matomoInstance = useMemo(() => {
    if (!ANALYTICS_URL || !ANALYTICS_SITE_ID) {
      return null;
    }

    return createInstance({
      urlBase: ANALYTICS_URL,
      siteId: ~~ANALYTICS_SITE_ID,
      configurations: {
        setRequestMethod: 'POST',
      },
    })
  }, [ANALYTICS_URL, ANALYTICS_SITE_ID]);

  if (!matomoInstance) {
    return <>{children}</>;
  }

  return <MatomoProvider value={matomoInstance}>{children}</MatomoProvider>;
};

export default TrackingProvider;

export const TrackPageView: React.FC = () => {
  const location = useLocation();
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ href: location.pathname });
  }, [trackPageView, location]);

  return null;
};

export const useTrackEvent = () => {
  const { trackEvent } = useMatomo();

  return trackEvent;
};
