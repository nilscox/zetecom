import useAxios from '../../hooks/use-axios';
import { CommentsArea, parseCommentsArea } from '../../types/CommentsArea';

const useFetchCommentsArea = ({ id, identifier }: { id?: number; identifier?: string }) => {
  const url = `/api/comments-area/${identifier ? `by-identifier/${identifier}` : id}`;
  const result = useAxios<CommentsArea>(url, parseCommentsArea);
  const [{ error }] = result;

  if (error) {
    throw error;
  }

  return result;
};

export default useFetchCommentsArea;
