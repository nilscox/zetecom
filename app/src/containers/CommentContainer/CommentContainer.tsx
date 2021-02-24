import React, { useRef } from 'react';

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

type CommentContainerProps = {
  comment: CommentType;
};

const CommentContainer: React.FC<CommentContainerProps> = ({ comment }) => {
  const ref = useRef<CommentRef>(null);

  const user = useUser();

  const [fetchReplies, { fetchingReplies, replies }] = useReplies(comment);
  const [onReply, { submittingReply }] = useReply(comment, ref.current?.onReplySubmitted);
  const [onEdit, { submittingEdition }] = useEdition(comment);
  const onSetReaction = useSetReaction(comment);
  const onSetSubscription = useSetSubscription(comment);
  const onReport = useReport(comment);
  const onViewHistory = useViewHistory(comment);

  return (
    <Comment
      ref={ref}
      CommentContainer={CommentContainer}
      user={user}
      comment={comment}
      replies={replies}
      repliesLoading={fetchingReplies}
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
