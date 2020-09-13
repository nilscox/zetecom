import { useEffect } from 'react';

import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

import { useEnvironment } from '../utils/env';

const usePageViewTracking = () => {
  const location = useLocation();
  const page = [location.pathname, location.search, location.hash].join('');
  const GOOGLE_ANALYTICS_ID = useEnvironment('GOOGLE_ANALYTICS_ID');

  useEffect(() => {
    if (GOOGLE_ANALYTICS_ID)
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
  }, [GOOGLE_ANALYTICS_ID]);

  useEffect(() => {
    if (GOOGLE_ANALYTICS_ID)
      ReactGA.pageview(page);
  }, [page, GOOGLE_ANALYTICS_ID]);
};

export default usePageViewTracking;
