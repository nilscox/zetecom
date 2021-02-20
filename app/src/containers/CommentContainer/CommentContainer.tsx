import React, { useCallback, useEffect, useState } from 'react';

import useAxios from 'src/hooks/useAxios';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import makeUser from 'src/test/makeUser';
import { Comment as CommentType } from 'src/types/Comment';

import Comment from '../../components/domain/Comment/Comment';

type CommentContainerProps = {
  comment: CommentType;
};

const user = makeUser();

const CommentContainer: React.FC<CommentContainerProps> = props => {
  const [comment, setComment] = useState(props.comment);

  const [fetchedReplies, { loading: repliesLoading }, fetchReplies] = useAxiosPaginated<CommentType>(
    `/api/comment/${comment.id}/replies`,
    { manual: true },
  );

  const [replies, setReplies] = useState<CommentType[]>();

  useEffect(() => {
    if (fetchedReplies) {
      setReplies(replies => [...(replies ?? []), ...fetchedReplies.items]);
    }
  }, [fetchedReplies]);

  const [edited, { loading: submittingEdition }, onEdit] = useAxios<CommentType>(
    {
      method: 'PUT',
      url: `/api/comment/${comment.id}`,
    },
    { manual: true },
  );

  useEffect(() => {
    setComment(comment => ({ ...comment, ...edited }));
  }, [edited]);

  const [reply, { loading: submittingReply }, onReply] = useAxios<CommentType>(
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
  }, [reply]);

  const handleEdit = useCallback(
    (text: string) => {
      onEdit({ data: { text } });
    },
    [onEdit],
  );

  const handleReply = useCallback(
    (text: string) => {
      onReply({ data: { text } });
    },
    [onReply],
  );

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
