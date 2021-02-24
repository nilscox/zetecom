import axios from 'axios';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';

import { Comment } from 'src/types/Comment';
import { CommentsArea } from 'src/types/CommentsArea';
import { SortType } from 'src/types/SortType';

const createComment: MutationFunction<Comment, { commentsAreaId: number; text: string }> = async ({
  commentsAreaId,
  text,
}) => {
  const response = await axios({ method: 'POST', url: '/api/comment', data: { commentsAreaId, text } });

  return response.data;
};

const useCreateComment = (
  { commentsAreaId, commentsAreaIdentifier }: { commentsAreaId?: number; commentsAreaIdentifier?: string },
  { commentsArea }: { commentsArea?: CommentsArea },
  {
    comments,
    totalComments,
    page,
    sort,
    search,
  }: { comments?: Comment[]; totalComments?: number; page: number; sort: SortType; search: string },
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: submittingRootComment } = useMutation<Comment, unknown, { text: string }>(
    ({ text }) => {
      if (!commentsArea) {
        throw new Error('useCreateComment: missing commentsArea');
      }

      return createComment({ commentsAreaId: commentsArea.id, text });
    },
    {
      onSuccess: data => {
        if (commentsArea) {
          queryClient.setQueryData(['commentsArea', { id: commentsAreaId, identifier: commentsAreaIdentifier }], {
            notFound: false,
            commentsArea: {
              ...commentsArea,
              commentsCount: commentsArea.commentsCount + 1,
            },
          });
        }

        if (comments && totalComments) {
          queryClient.setQueryData(
            ['comments', { commentsAreaId: commentsAreaId ?? commentsArea?.id }, { page, sort, search }],
            {
              total: totalComments + 1,
              items: [data, ...comments],
            },
          );
        }
      },
    },
  );

  return [mutate, { submittingRootComment }] as const;
};

export default useCreateComment;
