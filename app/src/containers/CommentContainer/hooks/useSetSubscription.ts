import axios from 'axios';
import { useMutation } from 'react-query';

import useUpdatedCachedComment from 'src/containers/CommentContainer/hooks/useUpdateCachedComment';
import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { Comment as CommentType } from 'src/types/Comment';

const setSubscription = async (comment: CommentType, subscribed: boolean) => {
  await axios.post(`/api/comment/${comment.id}/${subscribed ? 'subscribe' : 'unsubscribe'}`);
};

const useSetSubscription = (comment: CommentType) => {
  const updateComment = useUpdatedCachedComment();
  const trackEvent = useTrackEvent();

  const { mutate } = useMutation((subscribed: boolean) => setSubscription(comment, subscribed), {
    onMutate: subscribed => {
      updateComment({ ...comment, subscribed });
    },
    onSuccess: (_, subscribed) => {
      trackEvent(subscribed ? track.subscribeComment() : track.unsubscribeComment());
    },
  });

  return mutate;
};

export default useSetSubscription;
