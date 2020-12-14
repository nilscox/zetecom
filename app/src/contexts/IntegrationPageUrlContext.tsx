import React, { createContext, useContext, useMemo } from 'react';

import useQueryString from 'src/hooks/use-query-string';

const IntegrationPageUrlContext = createContext<string | null>(null);

export const IntegrationPageUrlProvider: React.FC = ({ children }) => {
  const params = useQueryString();

  const pageUrl = useMemo(() => {
    if (typeof params.pageUrl === 'string') {
      return decodeURIComponent(params.pageUrl);
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <IntegrationPageUrlContext.Provider value={pageUrl}>{children}</IntegrationPageUrlContext.Provider>;
};

export const useIntegrationPageUrl = () => {
  return useContext(IntegrationPageUrlContext);
};
