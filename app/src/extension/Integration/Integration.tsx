import React from 'react';

import styled from '@emotion/styled';
import axios from 'axios';
import { useMutation } from 'react-query';
import { RouteComponentProps, useLocation } from 'react-router';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';
import { useTracker, useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import useIFrameMessages from 'src/extension/hooks/useIFrameMessages';
import CommentsAreaClosed from 'src/extension/Integration/CommentsAreaClosed/CommentsAreaClosed';
import useQueryString from 'src/hooks/use-query-string';
import { color, spacing } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

const requestCommentsArea = async (identifier: string, informationUrl: string) => {
  await axios.post('/api/comments-area/request', { identifier, informationUrl });
};

const useRequestCommetsArea = (identifier: string, informationUrl: string) => {
  const trackEvent = useTrackEvent();

  const { mutate, isSuccess: requested } = useMutation(() => requestCommentsArea(identifier, informationUrl), {
    onSuccess: () => {
      trackEvent(track.commentsAreaRequested('Integration'));
    },
  });

  return [mutate, { requested }] as const;
};

const Container = styled.div`
  border: 1px solid ${color('border')};
  padding: ${spacing(1)};
`;

const Integration: React.FC<RouteComponentProps<{ identifier: string }>> = ({ match }) => {
  const { identifier } = match.params;
  const { pageUrl: informationUrl } = useQueryString();

  const [onRequest, { requested }] = useRequestCommetsArea(identifier, informationUrl as string);

  const [sendMessage] = useIFrameMessages();

  const trackEvent = useTrackEvent();
  const tracker = useTracker();
  const location = useLocation();

  const handleCommentsAreaLoaded = (commentsArea: CommentsArea) => {
    sendMessage({ type: 'INTEGRATION_LOADED', comments: commentsArea.commentsCount });

    trackEvent(track.viewIntegration(identifier, commentsArea));
    tracker.trackPageView({ href: location.pathname });
  };

  return (
    <Container>
      <HeaderLogo small link={false} />
      <CommentsAreaContainer
        commentsAreaIdentifier={identifier}
        notFoundFallback={<CommentsAreaClosed requested={requested} onRequest={onRequest} />}
        onCommentsAreaLoaded={handleCommentsAreaLoaded}
      />
    </Container>
  );
};

export default Integration;
