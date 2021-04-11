import React from 'react';

import { Redirect } from 'react-router';
import { toast } from 'react-toastify';

import PinnedComment from 'src/components/domain/PinnedComment/PinnedComment';
import AsyncContent from 'src/components/layout/AsyncContent/AsyncContent';
import CommentContainer from 'src/containers/CommentContainer/CommentContainer';
import useComment from 'src/hooks/domain/useComment';
import usePin from 'src/hooks/domain/usePin';

import useAncestors from './hooks/useAncestors';

type PinnedCommentContainerProps = {
  commentsAreaId: number;
  commentId: number;
};

const PinnedCommentContainer: React.FC<PinnedCommentContainerProps> = ({ commentsAreaId, commentId }) => {
  const [comment, { loadingComment }] = useComment(commentId);
  const [ancestors, found, { fetchingAncestors }] = useAncestors(commentId);

  const [, { onPin, onUnpin }] = usePin(comment);

  if (found === false) {
    toast.warning("Le commentaire épinglé n'existe pas ou a été supprimé");

    return <Redirect to={`/commentaires/${commentsAreaId}`} />;
  }

  return (
    <AsyncContent
      loading={loadingComment || fetchingAncestors}
      render={() =>
        ancestors &&
        comment && (
          <PinnedComment
            CommentContainer={CommentContainer}
            parents={ancestors}
            comment={comment}
            onPin={onPin}
            onUnpin={onUnpin}
          />
        )
      }
    />
  );
};

export default PinnedCommentContainer;
