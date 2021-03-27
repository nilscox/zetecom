import axios from 'axios';
import { QueryFunction, useQuery } from 'react-query';

import { Comment } from 'src/types/Comment';

const fetchComment: QueryFunction<Comment> = async ({ queryKey: [, { commentId }] }) => {
  const response = await axios.get<Comment>(`/api/comment/${String(commentId)}`);

  return response.data;
};

const useComment = (commentId: number | string) => {
  const { data: comment, isLoading: loadingComment } = useQuery(['comment', { commentId }], fetchComment);

  return [comment, { loadingComment }] as const;
};

export default useComment;
