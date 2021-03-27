import React from 'react';

import { Redirect, useHistory } from 'react-router';
import { toast } from 'react-toastify';

import PinnedComment from 'src/components/domain/PinnedComment/PinnedComment';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentContainer from 'src/containers/CommentContainer/CommentContainer';
import useComment from 'src/hooks/domain/useComment';

import useAncestors from './hooks/useAncestors';

type PinnedCommentContainerProps = {
  commentsAreaId: number;
  commentId: number;
};

const PinnedCommentContainer: React.FC<PinnedCommentContainerProps> = ({ commentsAreaId, commentId }) => {
  const history = useHistory();

  const [comment, { loadingComment }] = useComment(commentId);
  const [ancestors, found, { fetchingAncestors }] = useAncestors(commentId);

  const handlePin = (commentId: number) => history.push(`/commentaires/${commentsAreaId}?pin=${commentId}`);
  const handleUnpin = () => history.push(`/commentaires/${commentsAreaId}`);

  if (found === false) {
    toast.warning("Le commentaire épinglé n'existe pas ou a été supprimé");

    return <Redirect to={`/commentaires/${commentsAreaId}`} />;
  }

  return (
    <AsyncContent
      loading={loadingComment || fetchingAncestors}
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      render={() => (
        <PinnedComment
          CommentContainer={CommentContainer}
          parents={ancestors!}
          comment={comment!}
          onPin={handlePin}
          onUnpin={handleUnpin}
        />
      )}
    />
  );
};

export default PinnedCommentContainer;
