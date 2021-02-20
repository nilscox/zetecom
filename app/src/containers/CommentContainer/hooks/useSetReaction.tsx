import { useCallback } from 'react';

import useAxios from 'src/hooks/useAxios';
import { Comment as CommentType, ReactionType } from 'src/types/Comment';

const useSetReaction = (comment: CommentType) => {
  const [, , onSetReaction] = useAxios(
    { method: 'POST', url: `/api/comment/${comment.id}/reaction` },
    { manual: true },
  );

  return useCallback((reaction: ReactionType | null) => onSetReaction({ data: { type: reaction } }), [onSetReaction]);
};

export default useSetReaction;
