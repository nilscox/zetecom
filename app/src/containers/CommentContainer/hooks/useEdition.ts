import axios from 'axios';
import { useMutation } from 'react-query';

import useUpdatedCachedComment from 'src/containers/CommentContainer/hooks/useUpdateCachedComment';
import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { Comment } from 'src/types/Comment';

const editComment = async (comment: Comment, text: string) => {
  const response = await axios.put<Comment>(`/api/comment/${comment.id}`, { text });

  return response.data;
};

const useEdition = (comment: Comment) => {
  const updateComment = useUpdatedCachedComment();
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: submittingEdition } = useMutation<Comment, unknown, string>(
    text => editComment(comment, text),
    {
      onSuccess: comment => {
        updateComment(comment);
        trackEvent(track.commentEdited());
      },
    },
  );

  return [mutate, { submittingEdition }] as const;
};

export default useEdition;
