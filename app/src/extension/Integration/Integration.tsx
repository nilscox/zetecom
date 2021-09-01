import React from 'react';

import styled from '@emotion/styled';
import { RouteComponentProps, useLocation } from 'react-router';

import CommentForm from 'src/components/domain/CommentForm/CommentForm';
import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentsAreaContainer from 'src/containers/CommentsAreaContainer/CommentsAreaContainer';
import { useTracker, useTrackEvent } from 'src/contexts/trackingContext';
import { useUser } from 'src/contexts/userContext';
import track from 'src/domain/track';
import { onIntegrationLoaded } from 'src/extension/messages';
import { spacing } from 'src/theme';
import { CommentsArea } from 'src/types/CommentsArea';

import useCommentsAreaByIdentifier from './hooks/useCommentsAreaByIdentifier';
import useCreateFirstComment from './hooks/useCreateFirstComment';

const Container = styled.div`
  padding: ${spacing(1)};
`;

const StyledForm = styled(CommentForm)`
  margin-top: ${spacing(4)};
`;

type IntegrationContentProps = {
  integrationIdentifier: string;
  commentsArea?: CommentsArea;
};

const IntegrationContent: React.FC<IntegrationContentProps> = ({ integrationIdentifier, commentsArea }) => {
  const user = useUser();
  const [createComment, { creatingFirstComment }] = useCreateFirstComment(integrationIdentifier);

  if (commentsArea) {
    return <CommentsAreaContainer commentsAreaId={commentsArea.id} />;
  }

  if (user) {
    return (
      <StyledForm
        type="root"
        author={user}
        placeholder="Publiez un premier commentaire Zétécom sur cette page"
        submitting={creatingFirstComment}
        onSubmit={(text) => createComment({ text })}
      />
    );
  }

  return (
    <>
      Aucun commentaire Zétécom n'a été publié sur cette page pour le moment, connectez-vous pour proposer un premier
      commentaire.
    </>
  );
};

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

  const { commentsArea, loadingCommentsArea } = useCommentsAreaByIdentifier(identifier, handleCommentsAreaLoaded);

  return (
    <Container>
      <HeaderLogo small link={false} />
      <AsyncContent
        loading={loadingCommentsArea}
        render={() => <IntegrationContent integrationIdentifier={identifier} commentsArea={commentsArea} />}
      />
    </Container>
  );
};

export default Integration;
