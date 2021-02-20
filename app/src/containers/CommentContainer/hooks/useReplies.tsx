import { useCallback, useEffect, useState } from 'react';

import useAxios from 'src/hooks/useAxios';
import useAxiosPaginated from 'src/hooks/useAxiosPaginated';
import { Comment as CommentType } from 'src/types/Comment';

import { SetReplies } from '../CommentContainer';

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

  const handleReply = useCallback((text: string) => onReply({ data: { text } }), [onReply]);

  return [{ submittingReply: loading }, handleReply] as const;
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

export default useReplies;
