import axios from 'axios';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';

import { useTrackEvent } from 'src/contexts/trackingContext';
import track from 'src/domain/track';
import { CommentsArea } from 'src/types/CommentsArea';

const createFirstComment: MutationFunction<
  { commentsArea: CommentsArea; comment: Comment },
  { integrationIdentifier: string; text: string }
> = async ({ integrationIdentifier, text }) => {
  const createCommentsAreaResponse = await axios.post<CommentsArea>('/api/comments-area', {
    integrationIdentifier,
  });

  const response = await axios.post<Comment>('/api/comment', {
    commentsAreaId: createCommentsAreaResponse.data.id,
    text,
  });

  return { commentsArea: createCommentsAreaResponse.data, comment: response.data };
};

const useCreateFirstComment = (integrationIdentifier: string) => {
  const queryClient = useQueryClient();
  const trackEvent = useTrackEvent();

  const { mutate, isLoading: creatingFirstComment } = useMutation(
    ({ text }: { text: string }) => createFirstComment({ integrationIdentifier, text }),
    {
      onSuccess: ({ commentsArea }) => {
        queryClient.setQueryData(['commentsArea', { identifier: integrationIdentifier }], commentsArea);
        queryClient.setQueryData(['commentsArea', { id: commentsArea.id }], commentsArea);

        trackEvent(track.commentsAreaRequested('Integration'));
        trackEvent(track.commentCreated());
      },
    },
  );

  return [mutate, { creatingFirstComment }] as const;
};

export default useCreateFirstComment;
