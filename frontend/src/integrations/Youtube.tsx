import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

import { Information } from 'src/types/Information';
import { Reaction } from 'src/types/Reaction';
import { fetchInformationFromYoutubeId } from 'src/api/information';
import Loader from 'src/components/Loader';
import Integration from 'src/components/Integration';

const useInformation = (youtubeId: string) => {
  const [fetchingInformation, setFetching] = useState(false);
  const [information, setInformation] = useState<Information>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setFetching(true);

        const info = await fetchInformationFromYoutubeId(youtubeId);

        if (info)
          setInformation(info);
      } finally {
        setFetching(false);
      }
    })();
  }, [youtubeId]);

  return {
    fetchingInformation,
    information,
  };
};

type YoutubeProps = {
  youtubeId: string;
};

const Youtube: React.FC<YoutubeProps> = ({ youtubeId }) => {
  const { fetchingInformation, information } = useInformation(youtubeId);

  useEffect(() => {
    if (information) {
      window.parent.postMessage(
        { type: 'INTEGRATION_LOADED' },
        'https://www.youtube.com',
      );
    }
  }, [information]);

  if (fetchingInformation)
    return <Loader size="big" />;

  if (!information)
    return <div>L'espace de commentaire CDV n'est pas activé sur cette vidéo.</div>;

  return (
    <div style={{
      width: 'auto',
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
