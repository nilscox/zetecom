import { useState } from 'react';

import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

import { useTrackEvent } from 'src/contexts/TrackingContext';
import track from 'src/utils/track';

import useAxios from '../../../../hooks/use-axios';
import { Comment, ReactionType } from '../../../../types/Comment';

const useSetReaction = (comment: Comment, setComment: (comment: Comment) => void) => {
  const trackEvent = useTrackEvent();

  const [cancelToken, setCancelToken] = useState<CancelTokenSource>();
  const opts: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/comment/${comment.id}/reaction`,
  };

  const [{ error }, post] = useAxios(opts, { manual: true });

  if (error) {
    throw error;
  }

  return (type: ReactionType | null) => {
    if (comment.userReaction === type) {
      return;
    }

    if (cancelToken) {
      cancelToken.cancel();
    }

    const nextCancelToken = axios.CancelToken.source();
    setCancelToken(nextCancelToken);

    post({
      data: {
        commentId: comment.id,
        type: type || null,
      },
      cancelToken: nextCancelToken.token,
    });

    const getReactionsCount = (key: ReactionType) => {
      const count = comment.reactionsCount[key];

      if (comment.userReaction !== key && type === key) {
        return count + 1;
      }

      if (comment.userReaction === key && type !== key) {
        return count - 1;
      }

      return count;
    };

    setComment({
      ...comment,
      userReaction: type,
      reactionsCount: Object.keys(comment.reactionsCount).reduce(
        (obj, key: ReactionType) => ({
          ...obj,
          [key]: getReactionsCount(key),
        }),
        {} as Record<ReactionType, number>,
      ),
    });

    trackEvent(track.setReaction(type));
  };
};

export default useSetReaction;
