import React, { createContext, useContext, useMemo } from 'react';

import useQueryString from 'src/hooks/use-query-string';

const IFrameOriginContext = createContext<string | null>(null);

export const IFrameOriginProvider: React.FC = ({ children }) => {
  const params = useQueryString();

  const origin = useMemo(() => {
    if (typeof params.origin === 'string') {
      return decodeURIComponent(params.origin);
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IFrameOriginContext.Provider value={origin}>
      {children}
    </IFrameOriginContext.Provider>
  );
};

export const useIFrameOrigin = () => {
  return useContext(IFrameOriginContext);
};
