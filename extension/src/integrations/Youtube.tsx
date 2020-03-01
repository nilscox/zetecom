import React, { useEffect, useState } from 'react';

import Loader from 'src/components/common/Loader';
import useAxios from 'src/hooks/use-axios';
import useQueryString from 'src/hooks/use-query-string';
import { parseInformation } from 'src/types/Information';

import Integration from './Integration';

type YoutubeProps = {
  youtubeId: string;
};

const Youtube: React.FC<YoutubeProps> = ({ youtubeId }) => {
  const [{ data: information, loading, error }] = useAxios(
    {
      url: `/api/information/by-youtubeId/${youtubeId}`,
      validateStatus: s => [200, 404].includes(s),
    },
    parseInformation,
  );

  const [margin, setMargin] = useState(0);

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

const YoutubeIntegration: React.FC = () => {
  const { youtubeId } = useQueryString();

  if (!youtubeId || typeof youtubeId !== 'string')
    return null;

  return <Youtube youtubeId={youtubeId} />;
};

export default YoutubeIntegration;
