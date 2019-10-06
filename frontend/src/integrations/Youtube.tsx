import React, { useEffect, useState } from 'react';

import { parseInformation } from 'src/types/Information';
import useQueryString from 'src/hooks/useQueryString';
import Loader from 'src/components/common/Loader';

import Integration from './Integration';
import useAxios from 'src/hooks/use-axios';

type YoutubeProps = {
  youtubeId: string;
};

const Youtube: React.FC<YoutubeProps> = ({ youtubeId }) => {
  const [{ data: information, loading, error }] = useAxios(
    {
      url: `/api/information/by-youtubeId/${youtubeId}`,
      validateStatus: [200, 404].includes,
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

  if (!information)
    return <div>L'espace de commentaire n'est pas activé sur cette vidéo.</div>;

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
