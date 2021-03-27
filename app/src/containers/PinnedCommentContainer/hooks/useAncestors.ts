import axios from 'axios';
import { useQuery } from 'react-query';

import { Comment } from 'src/types/Comment';

const fetchAncestors = async (commentId: number) => {
  const response = await axios.get<Comment[]>(`/api/comment/${commentId}/ancestors`, {
    validateStatus: (status) => [200, 404].includes(status),
  });

  return { ancestors: response.data, found: response.status === 200 };
};

const useAncestors = (commentId: number) => {
  const { data, isLoading: fetchingAncestors } = useQuery(['commentAncestors', { commentId }], () =>
    fetchAncestors(commentId),
  );

  return [data?.ancestors, data?.found, { fetchingAncestors }] as const;
};

export default useAncestors;
