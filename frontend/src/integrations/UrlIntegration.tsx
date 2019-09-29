import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { parseInformation } from 'src/types/Information';
import Loader from 'src/components/common/Loader';

import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/useQueryString';

import Integration from './Integration';

const UrlIntegration: React.FC<RouteComponentProps> = () => {
  const { url } = useQueryString();
  const [margin, setMargin] = useState(0);

  const opts = {
    url: `/api/information/by-url/${encodeURIComponent(url as string)}`,
    validateStatus: (s: number) => [200, 404].includes(s),
  };
  const [{ data: information, loading, error, status }] = useAxios(opts, parseInformation);

  useEffect(() => {
    if (information) {
      if (window.parent === window)
        setMargin(15);
      else {
        window.parent.postMessage(
          { type: 'INTEGRATION_LOADED' },
          'https://www.youtube.com',
        );
      }
    }
  }, [information]);

  if (error)
    throw error;

  if (loading)
    return <Loader size="big" />;

  if (status(404)) {
    return (
      <div style={{ height: '100%' }}>
        L'espace de commentaire CDV n'est pas activé sur cette page.
      </div>
    );
  }

  return (
    <div style={{
      width: 'auto',
      margin: `0 ${margin}px`,
      paddingBottom: 20,
    }}>
      <Integration information={information} />
    </div>
  );
};

export default UrlIntegration;
