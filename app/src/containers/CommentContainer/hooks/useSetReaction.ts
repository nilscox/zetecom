import axios from 'axios';
import { useMutation } from 'react-query';

import useUpdatedCachedComment from 'src/containers/CommentContainer/hooks/useUpdateCachedComment';
import { Comment, ReactionType } from 'src/types/Comment';

const setReaction = async (comment: Comment, type: ReactionType | null) => {
  await axios.post(`/api/comment/${comment.id}/reaction`, { type });
};

const updateReactionsCount = (comment: Comment, type: ReactionType | null) => {
  const updated = { ...comment };
  const userReaction = comment.userReaction;
  const reactionsCount = comment.reactionsCount;

  updated.userReaction = type;

  updated.reactionsCount = {
    ...reactionsCount,
    ...(userReaction && { [userReaction]: reactionsCount[userReaction] - 1 }),
    ...(type && { [type]: reactionsCount[type] + 1 }),
  };

  return updated;
};

const useSetReaction = (comment: Comment) => {
  const updateComment = useUpdatedCachedComment();

  const { mutate } = useMutation((type: ReactionType | null) => setReaction(comment, type), {
    onMutate: type => {
      updateComment(updateReactionsCount(comment, type));
    },
  });

  return mutate;
};

export default useSetReaction;
