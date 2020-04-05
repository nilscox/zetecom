import React, { useEffect, useState } from 'react';

import { RouteComponentProps } from 'react-router';

import AsyncContent from 'src/components/common/AsyncContent';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseInformation } from 'src/types/Information';

import Integration from './Integration';

const DOMAIN_NAME_REGEXP = /(https?:\/\/[-.a-z0-9]+(:\d+)?)\/?/;

const UrlIntegration: React.FC<RouteComponentProps> = () => {
  const { url } = useQueryString();
  const [margin, setMargin] = useState(0);

  const opts = {
    url: `/api/information/by-url/${encodeURIComponent(url as string)}`,
    validateStatus: (s: number) => [200, 404].includes(s),
  };
  const [{ data: information, loading, error }] = useAxios(opts, parseInformation);

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
            match[1],
          );
        }
      }
    }
  }, [information, url]);

  if (error)
    throw error;

  return (
    <AsyncContent
      loading={loading}
      content={() => (
        <div style={{
          width: 'auto',
          margin: `0 ${margin}px`,
          paddingBottom: 20,
        }}>
          <Integration information={information} />
        </div>
      )}
    />
  );
};

export default UrlIntegration;
