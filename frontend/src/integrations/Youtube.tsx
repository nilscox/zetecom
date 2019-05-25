import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

import { Information } from '../types/Information';
import { Reaction } from '../types/Reaction';
import { fetchInformationFromYoutubeId } from '../fetch/fetchInformation';
import { InformationProvider } from '../utils/InformationContext';
import { MainReactionView } from '../views/MainReactionView';
import { DefaultView } from '../views/DefaultView';
import { Loader } from '../components/Loader';

const AppContent: React.FC = () => {
  const [mainReaction, setMainReaction] = useState<Reaction>(undefined);

  if (mainReaction) {
    return (
      <MainReactionView
        reaction={mainReaction}
        setAsMain={setMainReaction}
      />
    );
  }

  return (
    <DefaultView setAsMain={setMainReaction} />
  );
};

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

  if (fetchingInformation)
    return <Loader size="big" />;

  if (!information)
    return <div>Information not found</div>;

  return (
    <InformationProvider value={information}>
      <div style={{
        width: 'auto',
        paddingBottom: 20,
      }}>
        <AppContent />
      </div>
    </InformationProvider>
  );
};

const YoutubeIntegration: React.FC = () => {
  const { youtubeId } = queryString.parse(window.location.search);

  if (!youtubeId || typeof youtubeId !== 'string')
    return null;

  return <Youtube youtubeId={youtubeId} />;
};

export default YoutubeIntegration;
