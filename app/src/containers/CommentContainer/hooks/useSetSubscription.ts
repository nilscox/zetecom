import { useCallback, useEffect } from 'react';

import useAxios from 'src/hooks/useAxios';
import { Comment as CommentType } from 'src/types/Comment';

import { SetComment } from '../CommentContainer';

const useSetSubscription = (comment: CommentType, setComment: SetComment) => {
  const [, { status }, onSetSubscription] = useAxios({ method: 'POST' }, { manual: true });

  useEffect(() => {
    if (status(204)) {
      setComment(comment => ({ ...comment, subscribed: !comment.subscribed }));
    }
  }, [status, setComment]);

  return useCallback(
    (subscribed: boolean) => {
      onSetSubscription({ url: `/api/comment/${comment.id}` + (subscribed ? '/subscribe' : '/unsubscribe') });
    },
    [comment, onSetSubscription],
  );
};

export default useSetSubscription;
