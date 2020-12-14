import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import { CommentsAreaRequest } from 'src/types/CommentsArea';

const useFetchCommentsAreaRequests = () => {
  return useAxiosPaginated('/api/comments-area/request', undefined, CommentsAreaRequest);
};

export default useFetchCommentsAreaRequests;
