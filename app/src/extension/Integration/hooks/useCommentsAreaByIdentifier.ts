import axios from 'axios';
import { QueryFunction, useQuery, useQueryClient } from 'react-query';

import { CommentsArea } from 'src/types/CommentsArea';

const fetchCommentsAreaByIdentifier: QueryFunction<CommentsArea | undefined> = async ({
  queryKey: [, { identifier }],
}) => {
  const response = await axios(`/api/comments-area/by-identifier/${encodeURIComponent(identifier)}`, {
    validateStatus: (status) => [200, 404].includes(status),
  });

  if (response.status === 404) {
    return;
  }

  return response.data;
};

const useCommentsAreaByIdentifier = (
  commentsAreaIdentifier: string,
  onSucess?: (commentsArea: CommentsArea) => void,
) => {
  const queryClient = useQueryClient();

  const { data: commentsArea, isLoading: loadingCommentsArea } = useQuery(
    ['commentsArea', { identifier: commentsAreaIdentifier }],
    fetchCommentsAreaByIdentifier,
    {
      onSuccess: (commentsArea) => {
        if (commentsArea) {
          onSucess?.(commentsArea);
          queryClient.setQueryData(['commentsArea', { id: commentsArea.id }], commentsArea);
        }
      },
    },
  );

  return {
    commentsArea,
    loadingCommentsArea,
  };
};

export default useCommentsAreaByIdentifier;
