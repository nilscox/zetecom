import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { parseInformation } from 'src/types/Information';
import Loader from 'src/components/common/Loader';

import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';

import Integration from './Integration';

const DOMAIN_NAME_REGEXP = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/?\n]+)/;

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
        const match = DOMAIN_NAME_REGEXP.exec(url as string);

        if (!match)
          console.warn('Cannot find domain name from url');
        else {
          window.parent.postMessage(
            { type: 'INTEGRATION_LOADED' },
            match[0],
          );
        }
      }
    }
  }, [information, url]);

  if (error)
    throw error;

  if (loading)
    return <Loader size="big" />;

  if (status(404)) {
    return (
      <div style={{ height: '100%' }}>
        L'espace de commentaire n'est pas activé sur cette page.
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
