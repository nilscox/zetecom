import React from 'react';

import styled from '@emotion/styled';
import { RouteComponentProps, useLocation } from 'react-router';

import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';
import { useTracker, useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import CommentsAreaClosed from 'src/extension/Integration/CommentsAreaClosed/CommentsAreaClosed';
import { onIntegrationLoaded } from 'src/extension/messages';
import { spacing } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

const Container = styled.div`
  padding: ${spacing(1)};
`;

const Integration: React.FC<RouteComponentProps<{ identifier: string }>> = ({ match }) => {
  const { identifier } = match.params;

  const trackEvent = useTrackEvent();
  const tracker = useTracker();
  const location = useLocation();

  const handleCommentsAreaLoaded = (commentsArea: CommentsArea) => {
    onIntegrationLoaded(commentsArea.id, commentsArea.commentsCount);

    trackEvent(track.viewIntegration(identifier, commentsArea));
    tracker.trackPageView({ href: location.pathname });
  };

  return (
    <Container>
      <HeaderLogo small link={false} />
      <CommentsAreaContainer
        commentsAreaIdentifier={identifier}
        notFoundFallback={<CommentsAreaClosed identifier={identifier} />}
        onCommentsAreaLoaded={handleCommentsAreaLoaded}
      />
    </Container>
  );
};

export default Integration;
