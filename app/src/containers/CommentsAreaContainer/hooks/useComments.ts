import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { useUser } from 'src/contexts/userContext';
import { Comment } from 'src/types/Comment';
import { CommentsArea } from 'src/types/CommentsArea';
import { Paginated } from 'src/types/Paginated';
import { SortType } from 'src/types/SortType';
import makeParams from 'src/utils/makeParams';

const fetchComments = async (
  commentsArea: CommentsArea,
  page: number,
  sort: SortType,
  search: string,
  authenticated?: boolean,
): Promise<Paginated<Comment> | undefined> => {
  const response: AxiosResponse<Paginated<Comment>> = await axios('/api/comment', {
    params: makeParams({ page, sort, search }, { commentsAreaId: commentsArea.id }),
  });

  if (commentsArea.status === 'REQUESTED' && authenticated) {
    const pendingResponse: AxiosResponse<Paginated<Comment>> = await axios('/api/comment/pending', {
      params: { commentsAreaId: commentsArea.id },
    });

    response.data.items.unshift(...pendingResponse.data.items);
    response.data.total += pendingResponse.data.total;
  }

  return {
    items: response.data.items,
    total: response.data.total,
  };
};

const useComments = (commentsArea: CommentsArea, page: number, sort: SortType, search: string) => {
  const authenticated = useUser() !== null;

  const { data: { items: comments, total: totalComments } = {}, isLoading: loadingComments } = useQuery(
    ['comments', { commentsAreaId: commentsArea.id }, { page, sort, search }, { authenticated }],
    () => fetchComments(commentsArea, page, sort, search, authenticated),
  );

  return {
    loadingComments,
    totalComments,
    comments,
  };
};

export default useComments;
