import { useEffect, useState } from 'react';

import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';

import useAxios from '../../../../hooks/use-axios';
import { Comment, parseComment, ReactionType } from '../../../../types/Comment';
import { trackSetReaction } from '../../../../utils/track';

const useSetReaction = (comment: Comment, setComment: (comment: Comment) => void) => {
  const [cancelToken, setCancelToken] = useState<CancelTokenSource>();
  const opts: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/comment/${comment.id}/reaction`,
  };

  const [{ error, data, status }, post] = useAxios(opts, parseComment, { manual: true });

  if (error) {
    throw error;
  }

  useEffect(() => {
    if (status(201)) {
      trackSetReaction(data.userReaction);
    }
  }, [status, data]);

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
      reactionsCount: Object.keys(comment.reactionsCount).reduce((obj, key: ReactionType) => ({
        ...obj,
        [key]: getReactionsCount(key),
      }), {} as Record<ReactionType, number>),
    });
  };
};

export default useSetReaction;
