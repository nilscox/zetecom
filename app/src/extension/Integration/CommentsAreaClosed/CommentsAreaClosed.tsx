import React from 'react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useMutation } from 'react-query';

import Button from 'src/components/elements/Button/Button';
import Fallback from 'src/components/layout/Fallback/Fallback';
import { useTrackEvent } from 'src/contexts/trackingContext';
import { useUser } from 'src/contexts/userContext';
import track from 'src/domain/track';
import useQueryString from 'src/hooks/use-query-string';
import { fontSize, spacing } from 'src/theme';

const requestCommentsArea = async (identifier: string, informationUrl: string) => {
  await axios.post('/api/comments-area/request', { identifier, informationUrl });
};

const useRequestCommetsArea = (identifier: string, informationUrl: string) => {
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: requesting, isSuccess: requested } = useMutation(
    () => requestCommentsArea(identifier, informationUrl),
    {
      onSuccess: () => {
        trackEvent(track.commentsAreaRequested('Integration'));
      },
    },
  );

  return [mutate, { requesting, requested }] as const;
};

const CommentsAreaClosedFallback = styled.div`
  font-size: ${fontSize('xlarge')};
  margin-bottom: ${spacing(2)};
`;

type CommentsAreaClosedProps = {
  identifier: string;
};

const CommentsAreaClosed: React.FC<CommentsAreaClosedProps> = ({ identifier }) => {
  const { pageUrl: informationUrl } = useQueryString();
  const user = useUser();

  const [onRequest, { requesting, requested }] = useRequestCommetsArea(identifier, informationUrl as string);

  return (
    <Fallback
      when
      fallback={
        <>
          <CommentsAreaClosedFallback>
            L'espace de commentaires Zétécom n'est pas ouvert sur cette page.
          </CommentsAreaClosedFallback>

          {user && !requested && (
            <Button size="large" loading={requesting} onClick={() => onRequest()}>
              Demander l'ouverture
            </Button>
          )}

          {user && requested && (
            <>
              La demande d'ouverture a bien été prise en compte, les modérateurs vont traiter votre requête au plus
              vite.
            </>
          )}
        </>
      }
    />
  );
};

export default CommentsAreaClosed;
