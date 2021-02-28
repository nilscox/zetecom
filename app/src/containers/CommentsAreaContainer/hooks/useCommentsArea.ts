import axios from 'axios';
import { QueryFunction, useQuery } from 'react-query';

import { CommentsArea } from 'src/types/CommentsArea';

const fetchCommentsArea: QueryFunction<{ commentsArea: CommentsArea; notFound: boolean }> = async ({
  queryKey: [, { id, identifier }],
}) => {
  if (!id && !identifier) {
    throw new Error('getCommentsArea: missing both id and identifier');
  }

  const url = id ? `/api/comments-area/${id}` : `/api/comments-area/by-identifier/${encodeURIComponent(identifier)}`;
  const response = await axios(url, { validateStatus: s => [200, 404].includes(s) });

  return {
    commentsArea: response.data,
    notFound: response.status === 404,
  };
};

const useCommentsArea = (
  commentsAreaId?: number,
  commentsAreaIdentifier?: string,
  onSucess?: (commentsArea: CommentsArea) => void,
) => {
  const { data: { commentsArea, notFound: commentsAreaNotFound } = {}, isLoading: loadingCommentsArea } = useQuery(
    ['commentsArea', { id: commentsAreaId, identifier: commentsAreaIdentifier }],
    fetchCommentsArea,
    {
      onSuccess: ({ commentsArea, notFound }) => {
        if (!notFound) {
          onSucess?.(commentsArea);
        }
      },
    },
  );

  return {
    commentsArea,
    loadingCommentsArea,
    commentsAreaNotFound,
  };
};

export default useCommentsArea;
