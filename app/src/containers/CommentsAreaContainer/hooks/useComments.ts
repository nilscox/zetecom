import axios, { AxiosResponse } from 'axios';
import { QueryFunction, useQuery } from 'react-query';

import { Comment } from 'src/types/Comment';
import { Paginated } from 'src/types/Paginated';
import { SortType } from 'src/types/SortType';

const fetchComments: QueryFunction<Paginated<Comment> | undefined> = async ({
  queryKey: [, { commentsAreaId, parentId }, { page, sort, search }],
}) => {
  if (!commentsAreaId) {
    return;
  }

  const response: AxiosResponse<Paginated<Comment>> = await axios('/api/comment', {
    params: { commentsAreaId, parentId, page, sort, search },
  });

  return {
    items: response.data.items,
    total: response.data.total,
  };
};

const useComments = (commentsAreaId: number | undefined, page: number, sort: SortType, search: string) => {
  const { data: { items: comments, total: totalComments } = {}, isLoading: loadingComments } = useQuery(
    ['comments', { commentsAreaId }, { page, sort, search }],
    fetchComments,
  );

  return {
    loadingComments,
    totalComments,
    comments,
  };
};

export default useComments;
