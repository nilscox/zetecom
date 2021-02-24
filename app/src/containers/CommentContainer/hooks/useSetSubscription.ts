import axios from 'axios';
import { useMutation } from 'react-query';

import useUpdatedCachedComment from 'src/containers/CommentContainer/hooks/useUpdateCachedComment';
import { Comment as CommentType } from 'src/types/Comment';

const setSubscription = async (comment: CommentType, subscribed: boolean) => {
  await axios.post(`/api/comment/${comment.id}/${subscribed ? 'subscribe' : 'unsubscribe'}`);
};

const useSetSubscription = (comment: CommentType) => {
  const updateComment = useUpdatedCachedComment();

  const { mutate } = useMutation((subscribed: boolean) => setSubscription(comment, subscribed), {
    onMutate: subscribed => {
      updateComment({ ...comment, subscribed });
    },
  });

  return mutate;
};

export default useSetSubscription;
