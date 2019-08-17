import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useInformationFromYoutubeId } from 'src/api/information';

import Loader from 'src/components/common/Loader';

import Integration from './Integration';

type YoutubeProps = {
  youtubeId: string;
};

const Youtube: React.FC<YoutubeProps> = ({ youtubeId }) => {
  const [information, { loading: fetchingInformation, error }] = useInformationFromYoutubeId(youtubeId);
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

  if (fetchingInformation)
    return <Loader size="big" />;

  if (!information)
    return <div>L'espace de commentaire CDV n'est pas activé sur cette vidéo.</div>;

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
  const { youtubeId } = queryString.parse(window.location.search);

  if (!youtubeId || typeof youtubeId !== 'string')
    return null;

  return <Youtube youtubeId={youtubeId} />;
};

export default YoutubeIntegration;
