import { useEffect } from 'react';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import track from 'src/utils/track';

import useAxios from '../../../../hooks/use-axios';
import { Comment } from '../../../../types/Comment';

const useSubscription = (comment: Comment | null, setComment: (comment: Comment) => void) => {
  const trackEvent = useTrackEvent();

  const [{ loading, error, status }, execute] = useAxios({ method: 'POST' }, { manual: true });

  if (error) {
    throw error;
  }

  const toggleSubscription = () => {
    if (loading || !comment) {
      return;
    }

    execute({ url: `/api/comment/${comment.id}/${comment.subscribed ? 'unsubscribe' : 'subscribe'}` });
    setComment({ ...comment, subscribed: !comment.subscribed });
  };

  useEffect(() => {
    if (status(201)) {
      trackEvent(track.subscribeComment());
    } else if (status(204)) {
      trackEvent(track.unsubscribeComment());
    }
  }, [status, trackEvent]);

  return toggleSubscription;
};

export default useSubscription;
