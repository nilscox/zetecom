import axios from 'axios';
import { MutationFunction, useMutation } from 'react-query';

import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import useUpdatePartialQueries from 'src/hooks/useUpdatePartialQueries';
import { Comment } from 'src/types/Comment';
import { CommentsArea } from 'src/types/CommentsArea';
import { Paginated } from 'src/types/Paginated';

import useIncrementCommentsAreaCommentsCount from './useIncrementCommentsAreaCommentsCount';

const createComment: MutationFunction<Comment, { commentsAreaId: number; text: string }> = async ({
  commentsAreaId,
  text,
}) => {
  const response = await axios.post<Comment>('/api/comment', { commentsAreaId, text });

  return response.data;
};

const useAddCommentToCommentsList = () => {
  const updatePartialQueries = useUpdatePartialQueries();

  return (comment: Comment) => {
    updatePartialQueries<Paginated<Comment>>(['comments'], old => ({
      total: old.total + 1,
      items: [comment, ...old.items],
    }));
  };
};

const useCreateComment = (commentsArea?: CommentsArea) => {
  const incrementCommentsAreaCommentsCount = useIncrementCommentsAreaCommentsCount();
  const addCommentToCommentsList = useAddCommentToCommentsList();
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: submittingRootComment } = useMutation<Comment, unknown, { text: string }>(
    ({ text }) => {
      if (!commentsArea) {
        throw new Error('useCreateComment: missing commentsArea');
      }

      return createComment({ commentsAreaId: commentsArea.id, text });
    },
    {
      onSuccess: created => {
        incrementCommentsAreaCommentsCount();
        addCommentToCommentsList(created);
        trackEvent(track.commentCreated());
      },
    },
  );

  return [mutate, { submittingRootComment }] as const;
};

export default useCreateComment;
