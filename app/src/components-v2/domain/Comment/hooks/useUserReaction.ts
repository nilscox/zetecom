import { useMemo, useState } from 'react';

import { Comment, ReactionType } from 'src/types/Comment';

const useReactions = (
  comment: Comment,
  onUserReactionChange: (commentId: number, type: ReactionType | null) => void,
) => {
  const [userReaction, setUserReaction] = useState(comment.userReaction);

  const handleUserReactionChange = (type: ReactionType) => {
    if (type === userReaction) {
      setUserReaction(null);
      onUserReactionChange(comment.id, null);
    } else {
      setUserReaction(type);
      onUserReactionChange(comment.id, type);
    }
  };

  const reactionsCount = useMemo(() => {
    const getCount = (type: ReactionType) => {
      const count = comment.reactionsCount[type];

      if (comment.userReaction === userReaction) {
        return count;
      }

      if (userReaction === type) {
        return count + 1;
      }

      if (comment.userReaction === type) {
        return count - 1;
      }

      return count;
    };

    return Object.values(ReactionType).reduce(
      (obj, type) => ({
        ...obj,
        [type]: getCount(type),
      }),
      {} as Record<ReactionType, number>,
    );
  }, [comment, userReaction]);

  return [reactionsCount, userReaction, handleUserReactionChange] as const;
};

export default useReactions;
