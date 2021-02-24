import axios from 'axios';
import { useQuery } from 'react-query';

import { Comment as Comment } from 'src/types/Comment';
import { Paginated } from 'src/types/Paginated';

const fetchReplies = async (comment: Comment) => {
  const response = await axios.get<Paginated<Comment>>(`/api/comment/${comment.id}/replies`);

  return response.data;
};

const useReplies = (comment: Comment) => {
  const { refetch, data: { items: replies } = {}, isLoading: fetchingReplies } = useQuery(
    ['commentReplies', { commentId: comment.id }],
    () => fetchReplies(comment),
    { enabled: false },
  );

  return [refetch, { replies, fetchingReplies }] as const;
};

export default useReplies;
