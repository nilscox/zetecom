import React, { useCallback, useEffect, useState } from 'react';

import { useUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import { Comment as CommentType } from 'src/types/Comment';

import Comment from '../../components/domain/Comment/Comment';

type SetComment = React.Dispatch<React.SetStateAction<CommentType>>;
type SetReplies = React.Dispatch<React.SetStateAction<CommentType[] | undefined>>;

const useReply = (comment: CommentType, setReplies: SetReplies) => {
  const [reply, { loading }, onReply] = useAxios<CommentType>(
    {
      method: 'POST',
      url: '/api/comment',
      params: { parentId: comment.id },
    },
    { manual: true },
  );

  useEffect(() => {
    if (reply) {
      setReplies(replies => [reply, ...(replies ?? [])]);
    }
  }, [reply, setReplies]);

  return [{ submittingReply: loading }, onReply] as const;
};

const useReplies = (comment: CommentType) => {
  const [fetchedReplies, { loading: repliesLoading }, fetchReplies] = useAxiosPaginated<CommentType>(
    `/api/comment/${comment.id}/replies`,
    { manual: true },
  );

  const [replies, setReplies] = useState<CommentType[]>();
  const [{ submittingReply }, onReply] = useReply(comment, setReplies);

  useEffect(() => {
    if (fetchedReplies) {
      setReplies(replies => [...(replies ?? []), ...fetchedReplies.items]);
    }
  }, [fetchedReplies]);

  return [{ replies, repliesLoading, submittingReply }, fetchReplies, onReply] as const;
};

const useEdition = (comment: CommentType, setComment: SetComment) => {
  const [edited, { loading }, onEdit] = useAxios<CommentType>(
    {
      method: 'PUT',
      url: `/api/comment/${comment.id}`,
    },
    { manual: true },
  );

  useEffect(() => {
    setComment(comment => ({ ...comment, ...edited }));
  }, [edited, setComment]);

  return [{ submittingEdition: loading }, onEdit] as const;
};

type CommentContainerProps = {
  comment: CommentType;
};

const CommentContainer: React.FC<CommentContainerProps> = props => {
  const user = useUser();
  const [comment, setComment] = useState(props.comment);

  const [{ replies, repliesLoading, submittingReply }, fetchReplies, onReply] = useReplies(comment);
  const [{ submittingEdition }, onEdit] = useEdition(comment, setComment);

  const handleEdit = useCallback((text: string) => onEdit({ data: { text } }), [onEdit]);
  const handleReply = useCallback((text: string) => onReply({ data: { text } }), [onReply]);

  return (
    <Comment
      CommentContainer={CommentContainer}
      user={user}
      comment={comment}
      replies={replies}
      repliesLoading={repliesLoading}
      submittingEdition={submittingEdition}
      submittingReply={submittingReply}
      onEdit={handleEdit}
      onReport={() => {}}
      onUserReactionChange={() => {}}
      onToggleSubscription={() => {}}
      onReply={handleReply}
      fetchReplies={fetchReplies}
    />
  );
};

export default CommentContainer;
