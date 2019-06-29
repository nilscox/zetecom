import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export const ScrollToTop = withRouter(({ location }: RouteComponentProps) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
});
