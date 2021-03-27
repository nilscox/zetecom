import React from 'react';

import useReply from 'src/containers/CommentContainer/hooks/useReply';
import { useUser } from 'src/contexts/userContext';
import { Comment as CommentType } from 'src/types/Comment';

import Comment from '../../components/domain/Comment/Comment';

import useEdition from './hooks/useEdition';
import usePin from './hooks/usePin';
import useReplies from './hooks/useReplies';
import useReport from './hooks/useReport';
import useSetReaction from './hooks/useSetReaction';
import useSetSubscription from './hooks/useSetSubscription';
import useViewHistory from './hooks/useViewHistory';

type CommentContainerProps = {
  comment: CommentType;
};

const CommentContainer: React.FC<CommentContainerProps> = ({ comment }) => {
  const user = useUser();

  const [fetchReplies, { fetchingReplies, replies }] = useReplies(comment);
  const [onReply, { submittingReply }] = useReply(comment);
  const [onEdit, { submittingEdition }] = useEdition(comment);
  const [isPin, onPin] = usePin(comment);
  const onSetReaction = useSetReaction(comment);
  const onSetSubscription = useSetSubscription(comment);
  const onReport = useReport(comment);
  const onViewHistory = useViewHistory(comment);

  return (
    <Comment
      CommentContainer={CommentContainer}
      user={user}
      comment={comment}
      isPin={isPin}
      replies={replies}
      repliesLoading={fetchingReplies}
      submittingEdition={submittingEdition}
      submittingReply={submittingReply}
      onPin={onPin}
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
