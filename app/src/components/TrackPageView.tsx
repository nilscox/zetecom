import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import env from 'src/utils/env';
import ReactGA from 'src/utils/ga';

export const useTrackPageview = (shouldTrack?: (page: string) => boolean) => {
  const location = useLocation();
  const page = [location.pathname, location.search, location.hash].join('');

  useEffect(() => {
    if (env.GOOGLE_ANALYTICS_ID && shouldTrack(page))
      ReactGA.pageview(page);
  }, [page, shouldTrack]);
};

const TrackPageView: React.FC<{ shouldTrack?: (page: string) => boolean }> = ({ shouldTrack }) => {
  useTrackPageview(shouldTrack);
  return null;
};

export default TrackPageView;
