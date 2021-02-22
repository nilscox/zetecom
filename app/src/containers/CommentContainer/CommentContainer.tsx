import React, { useCallback, useRef, useState } from 'react';

import useReply from 'src/containers/CommentContainer/hooks/useReply';
import { useUser } from 'src/contexts/userContext';
import { Comment as CommentType } from 'src/types/Comment';

import Comment, { CommentRef } from '../../components/domain/Comment/Comment';

import useEdition from './hooks/useEdition';
import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useSetReaction from './hooks/useSetReaction';
import useSetSubscription from './hooks/useSetSubscription';
import useViewHistory from './hooks/useViewHistory';

export type SetComment = React.Dispatch<React.SetStateAction<CommentType>>;
export type SetReplies = React.Dispatch<React.SetStateAction<CommentType[] | undefined>>;

type CommentContainerProps = {
  comment: CommentType;
};

const CommentContainer: React.FC<CommentContainerProps> = props => {
  const ref = useRef<CommentRef>(null);

  const user = useUser();
  const [comment, setComment] = useState(props.comment);

  const [replies, { loading: repliesLoading, prepend }, fetchReplies] = useReplies(comment);

  const onReplySubmitted = useCallback(
    (reply: CommentType) => {
      prepend(reply);

      setComment(comment => ({
        ...comment,
        repliesCount: comment.repliesCount + 1,
      }));

      ref.current?.onReplySubmitted(reply);
    },
    [prepend],
  );

  const [{ loading: submittingReply }, onReply] = useReply(comment, onReplySubmitted);

  const [{ submittingEdition }, onEdit] = useEdition(comment, setComment);
  const onSetReaction = useSetReaction(comment);
  const onSetSubscription = useSetSubscription(comment, setComment);
  const onReport = useReport(comment);
  const onViewHistory = useViewHistory(comment);

  return (
    <Comment
      ref={ref}
      CommentContainer={CommentContainer}
      user={user}
      comment={comment}
      replies={replies}
      repliesLoading={repliesLoading}
      submittingEdition={submittingEdition}
      submittingReply={submittingReply}
      onEdit={onEdit}
      onReport={onReport}
      onSetReaction={onSetReaction}
      onSetSubscription={onSetSubscription}
      onReply={onReply}
      onViewHistory={onViewHistory}
      fetchReplies={fetchReplies}
    />
  );
};

export default CommentContainer;
