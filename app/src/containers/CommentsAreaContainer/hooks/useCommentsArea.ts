import axios from 'axios';
import { QueryFunction, useQuery } from 'react-query';

import { CommentsArea } from 'src/types/CommentsArea';

const fetchCommentsArea: QueryFunction<{ commentsArea?: CommentsArea; notFound: boolean }> = async ({
  queryKey: [, { id }],
}) => {
  const response = await axios(`/api/comments-area/${String(id)}`, {
    validateStatus: (status) => [200, 404].includes(status),
  });

  if (response.status === 404) {
    return { notFound: true };
  }

  return { commentsArea: response.data, notFound: false };
};

const useCommentsArea = (id: number) => {
  const { data: { commentsArea, notFound } = {}, isLoading: loadingCommentsArea } = useQuery(
    ['commentsArea', { id }],
    fetchCommentsArea,
  );

  return {
    commentsArea,
    loadingCommentsArea,
    notFound,
  };
};

export default useCommentsArea;
