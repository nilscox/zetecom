import React, { useState } from 'react';

import { useUser } from 'src/contexts/userContext';
import { Comment as CommentType } from 'src/types/Comment';

import Comment from '../../components/domain/Comment/Comment';

import useEdition from './hooks/useEdition';
import useReplies from './hooks/useReplies';
import useSetReaction from './hooks/useSetReaction';
import useSetSubscription from './hooks/useSetSubscription';

export type SetComment = React.Dispatch<React.SetStateAction<CommentType>>;
export type SetReplies = React.Dispatch<React.SetStateAction<CommentType[] | undefined>>;

type CommentContainerProps = {
  comment: CommentType;
};

const CommentContainer: React.FC<CommentContainerProps> = props => {
  const user = useUser();
  const [comment, setComment] = useState(props.comment);

  const [{ replies, repliesLoading, submittingReply }, fetchReplies, onReply] = useReplies(comment);
  const [{ submittingEdition }, onEdit] = useEdition(comment, setComment);
  const onSetReaction = useSetReaction(comment);
  const onSetSubscription = useSetSubscription(comment, setComment);

  return (
    <Comment
      CommentContainer={CommentContainer}
      user={user}
      comment={comment}
      replies={replies}
      repliesLoading={repliesLoading}
      submittingEdition={submittingEdition}
      submittingReply={submittingReply}
      onEdit={onEdit}
      onReport={() => {}}
      onSetReaction={onSetReaction}
      onSetSubscription={onSetSubscription}
      onReply={onReply}
      fetchReplies={fetchReplies}
    />
  );
};

export default CommentContainer;
